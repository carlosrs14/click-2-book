import { Component } from '@angular/core';
import { Pension } from '../../models/pension';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { PensionService } from '../../services/pensiones/pension.service';
import { Telefono } from '../../models/telefono';
import { Reserva } from '../../models/reserva';
import { Router, RouteReuseStrategy } from '@angular/router';
import { Ciudad } from '../../models/ciudad';
import { Barrio } from '../../models/barrio';
import { TipoPropiedad } from '../../models/tipospropiedad';
import { LocacionService } from '../../services/locaciones/locacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-propietario',
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './propietario.component.html',
  styleUrl: './propietario.component.css'
})
export class PropietarioComponent {

  	constructor(private servicio: PensionService, private router: Router, private  servicioLocaciones: LocacionService) {}
  	pensiones: Pension[] = [];
  	imagen = 'assets/pension-fondo.jpg';
	
	pensionSelected: Pension = new Pension(0, 0,false, false, "", "", "", 0, 0);
  	newPension: Pension = new Pension(0, 0, false, false, "", "", "", 0, 0);
	nombre: string = "";
  	apellido: string = "";
  	telefonos: Telefono[] = [];
  	reservas: Reserva[] = [];
  	tiempo: number = 0;


	isEditing: boolean = false;
	isAdding: boolean = false;
	idCiudad: number = 0;

	cupocompletoAnterior: boolean = false;
	descripcionAnterior: string = "";
	ambienteFamiliarAnterior: boolean = false;

	ciudades: Ciudad[] = [];
	barrios: Barrio[] = [];
	tiposdePropiedad: TipoPropiedad[] = [];

  	ngOnInit(): void {
    	const nombreCache = localStorage.getItem("nombreUsuario");
    	const idPropietarioStr = localStorage.getItem('idUsuario');

		if (!nombreCache || !idPropietarioStr) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Debes logearte",
			});
			return;
		} else {
			this.nombre = nombreCache.toString();
		}
		const idPropietario = parseInt(idPropietarioStr);
		this.servicio.filterByPropietario(idPropietario).subscribe({
			next: (response) => {
				for (let pension of response) {
				this.pensiones.push(
					new Pension(
						pension.id,
						pension.user_id,
						pension.esambientefamiliar,
						pension.escupocompleto,
						pension.direccion,
						"",
						pension.descripcion,
						pension.barrio_id,
						pension.tipopropiedad_id
					));
				}
			},
			error: (error) => {
				console.log(error);
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Hubo un error al cargar las pensiones",
				});
			}
		});
		this.cargarCiudades();
		this.cargarTiposPropiedad();
	}

	deletePension(idPension: number) {
  		Swal.fire({
    		title: "¿Estás seguro?",
			text: "¡Esta acción no se puede deshacer!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí, eliminar",
			cancelButtonText: "Cancelar"
  		}).then((result) => {
    		if (result.isConfirmed) {
      			this.servicio.deletePension(idPension).subscribe({
        			next: () => {
          				Swal.fire("Eliminado", "La pensión ha sido eliminada correctamente.", "success").then(() => {
            				location.reload(); 
         				});
       				},
        			error: () => {
          				Swal.fire("Error", "No se pudo eliminar la pensión.", "error");
        			}
     	 		});
    		}
  		});
	}

	editPension(pension: Pension) {
		this.pensionSelected = pension;
		this.cupocompletoAnterior = pension.esCupoCompleto;
		this.descripcionAnterior = pension.descripcion;
		this.ambienteFamiliarAnterior = pension.esAmbienteFamiliar;
		this.abrirModalEditing();
	}

	guardarCambios() {
		if (!this.pensionSelected) {
			this.cerrarModalEditing();
			return;
		}
		this.servicio.updatePension(this.pensionSelected).subscribe({
			next: (response) => {
				Swal.fire({
					title: "Pension modificada correctamente",
					icon: "success",
					draggable: true
				});
			},
			error: (error) => {
				this.pensionSelected.esAmbienteFamiliar = this.ambienteFamiliarAnterior;
				this.pensionSelected.esCupoCompleto = this.cupocompletoAnterior;
				this.pensionSelected.descripcion = this.descripcionAnterior;
				this.cupocompletoAnterior = false;
				this.descripcionAnterior = "";
				this.ambienteFamiliarAnterior = false;
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "No se ha podido modificar la pensión",
				});
			}
		});
		this.cerrarModalEditing();
	}

	guardarNuevo() {
		const idUsuario = localStorage.getItem('idUsuario');
  		if (!idUsuario) return;
		this.newPension.user_id = parseInt(idUsuario);

		this.servicio.createPension(this.newPension).subscribe({
			next: (response) => {
				Swal.fire({
					title: "Pension creada correctamente",
					icon: "success",
					draggable: true
				}).then(
					()=> location.reload()

				);
				
			},
			error: (error) => {
				Swal.fire({
					icon: "error",
					title: "Oops...",
					text: "Hubo un error al guardar la pensión",
				});
			}
		});
		this.cerrarModalAdding();
	}

	cancelarCambios() {
		this.pensionSelected.esAmbienteFamiliar = this.ambienteFamiliarAnterior;
		this.pensionSelected.esCupoCompleto = this.cupocompletoAnterior;
		this.pensionSelected.descripcion = this.descripcionAnterior;
		this.cupocompletoAnterior = false;
		this.descripcionAnterior = "";
		this.ambienteFamiliarAnterior = false;
		this.cerrarModalEditing();
	}

	cerrarModalEditing() {
		this.isEditing = false;
	}

	abrirModalEditing() {
		this.isEditing = true;
	}

	cerrarModalAdding() {
		this.isAdding = false;
	}

	abrirModalAdding() {
		this.isAdding = true;
	}

	infoPension(idPension: number) {
		this.router.navigate([`/pension/${idPension}`]);
	}

	cargarCiudades() {
	    this.servicioLocaciones.getCiudades().subscribe({
			next: (data) => this.ciudades = data,
			error: () => Swal.fire({
							icon: "error",
							title: "Oops...",
							text: "Hubo un error al cargar las ciudades",
						})
		});
	}
	
	cargarBarrios(idCiudad: number) {
		if (!idCiudad || idCiudad == 0) {
			this.barrios = [];
			return;
		}
	    this.servicioLocaciones.filtrarBarriosPorCiudad(idCiudad).subscribe({
			next: (data) => this.barrios = data,
			error: () => Swal.fire({
							icon: "error",
							title: "Oops...",
							text: "Hubo un error al cargar los barrios",
						})
    	});
	}

	cargarTiposPropiedad() {
		this.servicio.getTiposPropiedad().subscribe({
			next: (data) => this.tiposdePropiedad = data,
			error: () => Swal.fire({
							icon: "error",
							title: "Oops...",
							text: "Hubo un error al cargar las propiedades",
						})
		});
	}
}

