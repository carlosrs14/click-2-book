import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PensionService } from '../../services/pensiones/pension.service';
import { Pension } from '../../models/pension';
import { FormsModule } from '@angular/forms';
import { Cuarto } from '../../models/cuarto';
import { CuartoService } from '../../services/cuartos/cuarto.service';
import { ReservaService } from '../../services/reservas/reserva.service';
import { Reserva } from '../../models/reserva';
import { LocacionService } from '../../services/locaciones/locacion.service';
import Swal from 'sweetalert2';
import { rxResource } from '@angular/core/rxjs-interop';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-pensiones',
  imports: [RouterModule, FormsModule],
  standalone: true,
  templateUrl: './pensiones.component.html',
})
export class PensionesComponent {
  // Filters state (signals)
  tipoSeleccionado = signal('0');
  barrioSeleccionado = signal('0');
  precioMinimo = signal(0);
  precioMaximo = signal(0);
  cupoCompleto = signal(false);
  ambienteFamiliar = signal(false);
  individual = signal(false);
  aire = signal(false);

  mostrarModal = signal(false);
  cuartos = signal<Cuarto[]>([]);
  fechaInicio = signal('');
  fechaFin = signal('');
  cantidadPensionados = signal(0);
  idPensionActual = signal(0);

  // rxResource for metadata
  barriosResource = rxResource({
    loader: () => this.servicioLocaciones.getBarrios()
  });

  tiposPropiedadResource = rxResource({
    loader: () => this.servicio.getTiposPropiedad()
  });

  // Filter signal to trigger resource reload
  filterTrigger = signal(0);

  // rxResource for fetching pensiones
  pensionesResource = rxResource({
    request: () => ({
      trigger: this.filterTrigger(),
      tipo: parseInt(this.tipoSeleccionado()),
      barrio: parseInt(this.barrioSeleccionado()),
      min: this.precioMinimo(),
      max: this.precioMaximo(),
      cupo: this.cupoCompleto(),
      fam: this.ambienteFamiliar(),
      ind: this.individual(),
      aire: this.aire()
    }),
    loader: ({ request }) => {
      if (request.trigger === 0) {
        return this.servicio.getPensiones();
      } else {
        return this.servicio.filtrarPensiones(
            request.tipo, request.barrio, request.min, request.max,
            request.cupo, request.fam, request.ind, request.aire
          );
      }
    }
  });

  // Computed to transform response to Pension objects
  pensiones = computed(() => {
    const data = this.pensionesResource.value() as any[];
    if (!data) return [];

    return data.map((p: any) => {
      const pen = new Pension(
        p.id, p.user_id, p.esambientefamiliar, p.escupocompleto,
        p.direccion, "", p.descripcion, p.barrio_id, p.tipopropiedad_id
      );
      if (Array.isArray(p.imagenes) && p.imagenes.length > 0) {
        for (const img of p.imagenes) pen.addImgen(img.full_url);
      }
      return pen;
    });
  });

  constructor(
    private servicio: PensionService,
    private servcioCuarto: CuartoService,
    private servicioReserva: ReservaService,
    private servicioLocaciones: LocacionService
  ) { }

  filtrarPensiones() {
    this.filterTrigger.update(v => v + 1);
  }

  restablecerFiltros() {
    this.tipoSeleccionado.set('0');
    this.barrioSeleccionado.set('0');
    this.precioMinimo.set(0);
    this.precioMaximo.set(0);
    this.cupoCompleto.set(false);
    this.ambienteFamiliar.set(false);
    this.individual.set(false);
    this.aire.set(false);
    this.filterTrigger.set(0);
  }

  abrirModal(idPension: number) {
    this.idPensionActual.set(idPension);
    this.mostrarModal.set(true);
    this.cuartos.set([]);

    this.servcioCuarto.filterByPropiedad(idPension).subscribe({
      next: (response) => {
        const c = response.map((cuarto: any) => new Cuarto(cuarto.id, 0, 0, cuarto.tieneaire, cuarto.descripcion, idPension));
        this.cuartos.set(c);
      },
      error: () => {
        Swal.fire({ icon: "error", title: "Oops...", text: "Error al cargar los cuartos" });
      }
    });
  }

  cerrarModal() {
    this.mostrarModal.set(false);
    this.fechaInicio.set('');
    this.fechaFin.set('');
    this.cuartos.set([]);
  }

  reservar(idCuarto: number) {
    const idUsuarioStr = localStorage.getItem('idUsuario');
    if (!idUsuarioStr) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Debes iniciar sesión para reservar." });
      return;
    }
    const idUsuario = parseInt(idUsuarioStr);

    this.servicioReserva.createReserva(new Reserva(0, idUsuario, idCuarto, this.fechaInicio(), this.fechaFin(), this.cantidadPensionados())).subscribe({
      next: () => {
        Swal.fire({ title: "Reserva realizada con éxito", icon: "success" });
        this.cerrarModal();
      },
      error: () => {
        Swal.fire({ icon: "error", title: "Oops...", text: "Error al realizar la reserva" });
      }
    });
  }
}
