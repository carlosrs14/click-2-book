import { Component } from '@angular/core';
import { Pension } from '../../models/pension';
import { ActivatedRoute } from '@angular/router';
import { PensionService } from '../../services/pensiones/pension.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Cuarto } from '../../models/cuarto';
import { CuartoService } from '../../services/cuartos/cuarto.service';
import { FormsModule } from '@angular/forms';
import { ImagenService } from '../../services/imagenes/imagen.service';
import { Imagen } from '../../models/imagen';

import Swal from 'sweetalert2';

@Component({
    selector: 'app-pension',
    imports: [NgIf, NgFor, FormsModule],
    templateUrl: './pension.component.html',
    styleUrl: './pension.component.css'
})
export class PensionComponent {
	pension: Pension = new Pension(0, 0, false, false, "", "", "", 0, 0);
    idPension: number = 0;
    cuartos: Cuarto[] = [];
    provisionalCuarto:Cuarto = new Cuarto(0, 0, 0, false, "", 0);
    editCuarto: Cuarto = new Cuarto(0, 0, 0, false, "", 0);;
    isCreating = false;
    isEditing = false;
    isAddingFotos = false;
    imagen: Imagen = new Imagen(0, "", null, 0);

    constructor(private servicioImagen: ImagenService, private servicioPension: PensionService, private servicioCuarto: CuartoService, private route: ActivatedRoute) {}
	ngOnInit() {
		const id = this.route.snapshot.paramMap.get("id");
        if (!id) {
            return;
        }
        this.idPension = parseInt(id);
        this.servicioPension.getPension(this.idPension).subscribe({
            next: (response) => {
                this.pension.id = this.idPension;
                this.pension.barrio_id = response.barrio_id;
                this.pension.direccion = response.direccion;
                this.pension.esAmbienteFamiliar = response.esambientefamiliar;
                this.pension.barrio_id = response.barrio_id;
                this.pension.esCupoCompleto = response.escupocompleto;
                this.pension.descripcion = response.descripcion;
                this.pension.user_id = response.user_id;
            },
            error: (error) => {
               Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Hubo un error al cargar la pensión",
                });
            }
        });
        this.cuartos = [];
        this.servicioCuarto.filterByPropiedad(this.idPension).subscribe({
            next: (response) => {
                for (let cuartoRes of response) {
                    this.cuartos.push(new Cuarto(cuartoRes.id, cuartoRes.valormensual, cuartoRes.capacidad, cuartoRes.tieneaire, cuartoRes.descripcion, this.idPension));
                }
            },
            error: (error) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Hubo un error al cargar los datos de esta pensión",
                });
            }
        });
        
	}

borrarCuarto(idcuarto: number) {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            this.servicioCuarto.deleteCuarto(idcuarto).subscribe({
                next: () => {
                Swal.fire("Eliminado", "El cuarto ha sido eliminado.", "success").then(() => {
                    location.reload();
                    });
                },
            error: () => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "No se ha podido eliminar este cuarto",
                });
            }
            });
        }
     });
}


    crearCuarto() {
        this.provisionalCuarto.propiedad_id = this.idPension;
        this.servicioCuarto.createCuarto(this.provisionalCuarto).subscribe({
            next: (response) => {
                Swal.fire({
                    title: "Cuarto creado correctamente",
                    icon: "success",
                    showConfirmButton: true,
                    allowOutsideClick: false
                }).then(
                    () => location.reload()
                );
            },
            error: (error) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "No se ha podido crear este cuarto",
                });
                console.log(error);
            }
        });
    }

    updateCuarto() {
        this.servicioCuarto.updateCuarto(this.editCuarto).subscribe({
            next: (response) => {
                Swal.fire({
                    title: "Cuarto editado correctamente",
                    icon: "success",
                    draggable: true
                }).then(
                    () => location.reload()
                )
            },
            error: (error) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "No se ha podido editar este cuarto",
                });
                console.log(error);
            }
        });
    }

    cargarImagen() {
        this.servicioImagen.createImagen(this.idPension, this.imagen).subscribe({
            next: (response) => {
                alert("Imagen cargada correctamente");
                location.reload();
            },
            error: (error) => {
                console.log(error);
               alert("Error al cargar la imagen");
            }
        });
    }
    onImagenSeleccionada(event: Event) {
        const archivo = event.target as HTMLInputElement;
        if (archivo.files && archivo.files.length > 0) {
            const imagenFile: File = archivo.files[0];
            this.imagen.imagen = imagenFile;
        }
    }

    abrirModalCrear() {
        this.isCreating = true;
    }
    
    abrirModalEditar(cuarto: Cuarto) {
        this.isEditing = true;
        this.editCuarto =  new Cuarto(cuarto.id, 
            cuarto.valorMensual, 
            cuarto.capacidad, 
            cuarto.tieneAire, 
            cuarto.descripcion, 
            cuarto.propiedad_id
        );
    }

    abrirModalFotos() {
        this.isAddingFotos = true;
    }
    cerrarModalEdit() {
        this.isEditing = false;
    }
    
    cerrarModalAddCuarto() {
        this.isCreating = false;
    }
    
    cerrarModalAddFoto() {
        this.isAddingFotos = false;
    }
}
