import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { PensionService } from '../../services/pensiones/pension.service';
import { Pension } from '../../models/pension';
import { FormsModule } from '@angular/forms';
import { Cuarto } from '../../models/cuarto';
import { CuartoService } from '../../services/cuartos/cuarto.service';
import { ReservaService } from '../../services/reservas/reserva.service';
import { Reserva } from '../../models/reserva';
import { Barrio } from '../../models/barrio';
import { TipoPropiedad } from '../../models/tipospropiedad';
import { LocacionService } from '../../services/locaciones/locacion.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-pensiones',
	imports: [RouterModule, NgFor, FormsModule, NgIf],
	standalone: true,
	templateUrl: './pensiones.component.html',
	styleUrl: './pensiones.component.css'
})
export class PensionesComponent {
	constructor(private servicio: PensionService, private servcioCuarto: CuartoService, private servicioReserva: ReservaService, private servicioLocaciones: LocacionService) {}
	barrios: Barrio[] = [];
	tiposPropiedad: TipoPropiedad[] = [];

	tipoSeleccionado: string = '';
	barrioSeleccionado: string = '';
	precioMinimo: number = 0;
	precioMaximo: number = 0;
	cupoCompleto: boolean = false;
	ambienteFamiliar: boolean = false;
	individual: boolean = false;
	aire: boolean = false;

	pensiones: Pension[] = [];
	cuartos: Cuarto[] = [];
	mostrarModal: boolean = false;
	imagen = 'assets/pension-fondo.jpg';
	userName: string = '';
	fechaInicio: string = '';
	fechaFin: string = '';
	cantidadPensionados: number = 0;

  	ngOnInit(): void {
		this.userName = localStorage.getItem('nombreUsuario') || 'Visitante';
		this.servicio.getPensiones().subscribe({
			next: (response: any[]) => {
				this.pensiones = []
				for (const p of response) {
					const pen = new Pension(
						p.id,
						p.user_id,
						p.esambientefamiliar,
						p.escupocompleto,
						p.direccion,
						"",
						p.descripcion,
						p.barrio_id,
						p.tipopropiedad_id
					);
					if (Array.isArray(p.imagenes) && p.imagenes.length > 0) {
						for (const img of p.imagenes) {
							pen.addImgen(img.full_url);
						}
					}
					this.pensiones.push(pen);
				}
			},
			error: (error) => {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Hubo un error al cargar la pensión",
				});
			}
		});

		this.servicioLocaciones.getBarrios().subscribe({
			next: (data) => this.barrios = data,
			error: () => alert("Error al cargar barrios")
		});

		this.servicio.getTiposPropiedad().subscribe({
			next: (data) => this.tiposPropiedad = data,
			error: () => Swal.fire({
							icon: "error",
							title: "Oops...",
							text: "Error al cargar tipos de propiedad",
						})
		});
  	}
  
  	buscarCuartos(idPropiedad: number) {
		this.servcioCuarto.filterByPropiedad(idPropiedad).subscribe({
			next: (response) => {
				this.cuartos = response; 
			},
			error: (err) => {
				console.error(err);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Error al buscar cuartos",
				});
			}
		});
  	}

  	filtrarPensiones() {
		this.pensiones = [];
		this.servicio.filtrarPensiones(
			parseInt(this.tipoSeleccionado),
			parseInt(this.barrioSeleccionado),
			this.precioMinimo,
			this.precioMaximo,
			this.cupoCompleto,
			this.ambienteFamiliar,
			this.individual,
			this.aire
		).subscribe({
      		next: (response) => {
       			 for(let pension of response) {
          			this.pensiones.push(new Pension(pension.id, pension.user_id, pension.esambientefamiliar, pension.escupocompleto, pension.direccion, "", pension.descripcion, pension.barrio_id, pension.tipopropiedad_id));
        		}
      		},
      		error: (error) => {
				console.log(error);
        		Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Hubo un error al cargar las pensiones filtradas",
				});
      		}
    	});
  	}

  	restablecerFiltros() {
		this.precioMaximo = 0;
		this.precioMinimo = 0;
		
		this.ambienteFamiliar = false;
		this.cupoCompleto = false;
		this.individual = false;
		this.aire = false;
  	}

  	abrirModal(idPension: number) {
		this.mostrarModal = true;
		this.cuartos = [];

		this.servcioCuarto.filterByPropiedad(idPension).subscribe({
			next: (response) => {
				for (let cuarto of response) {
					this.cuartos.push(new Cuarto(cuarto.id, 0, 0, cuarto.tieneaire, cuarto.descripcion, idPension));
				}
			},
			error: (error) => {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Error al cargar los cuartos",
				});
			}
		});
	}

  	cerrarModal() {
		this.mostrarModal = false;
		this.fechaInicio = '';
		this.fechaFin = '';
		this.cuartos = [];
  	}
  
  	reservar(idCuarto: number) {
		const idUsuarioStr = localStorage.getItem('idUsuario');
		if (!idUsuarioStr) {
			Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Hubo un error al cargar la pensión",
				});
			return;
		}
		const idUsuario = parseInt(idUsuarioStr);
		this.servicioReserva.createReserva(new Reserva(0, idUsuario, idCuarto, this.fechaInicio, this.fechaFin, this.cantidadPensionados)).subscribe({
			next: (response) => {
				Swal.fire({
					title: "Reserva realizada con exito",
					icon: "success",
					draggable: true
				});
				this.cerrarModal();
			},
			error: (error) => {
				console.log(error);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Error al cargar las reservas",
				});
			}
		});
	}
}
/*
{
	id: 1

}
*/
