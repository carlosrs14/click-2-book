import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Reserva } from '../../models/reserva';
import { ReservaService } from '../../services/reservas/reserva.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservas',
  imports: [NgFor],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent {

  	reservas: Reserva[] = [];
 	constructor(private reservaService: ReservaService) { }
  	ngOnInit(): void {
    	const idUserStr = localStorage.getItem('idUsuario');
    	if (!idUserStr) {
      		Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Debes iniciar sesión",
			});
      		return;
    	}
    	const idUsuario = parseInt(idUserStr);
    	this.reservaService.getByUser(idUsuario).subscribe({
      		next: (response) => {
        		for (let reserva of response) {
    	      		this.reservas.push(new Reserva(reserva.id, idUsuario, reserva.cuarto_id, reserva.inicio, reserva.fin, reserva.cantidad_pensionados));
        		}
      		},
      		error: (error) => {
        		Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Error al cargar las reservas",
			});
      		}
    	});
  	}
	borrarReserva(reserva_id: number) {
  		Swal.fire({
    		title: "¿Estás seguro?",
    		text: "Esta acción eliminará la reserva de forma permanente.",
    		icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí, eliminar",
			cancelButtonText: "Cancelar"
  		}).then((result) => {
    		if (result.isConfirmed) {
      			this.reservaService.deleteReserva(reserva_id).subscribe({
        			next: () => {
          				Swal.fire("Eliminado", "La reserva fue borrada exitosamente.", "success").then(() => {
            				location.reload(); // Solo si se eliminó correctamente
         			 	});
        			},
        			error: () => {
          				Swal.fire("Error", "No se pudo borrar la reserva.", "error");
        			}
      			});
    		}
 		 });
	}

}
