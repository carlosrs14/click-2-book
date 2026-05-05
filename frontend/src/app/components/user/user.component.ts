import { Component, inject, Injectable, NgModule } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent {

  loginService = inject(LoginService);
  router = inject(Router);

  correo:string = localStorage.getItem("emailUsuario") || "";
  nombre:string = localStorage.getItem("nombreUsuario") || "";
  rol:string = localStorage.getItem("rolUsuario") || "";

  
  nuevoNombre:string = this.nombre;
  editando = false;

eliminar() {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Seguro que deseas eliminar tu cuenta",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      this.loginService.deleteUser().subscribe({
        next: () => {
          localStorage.clear();
          this.router.navigate(['/login']);
          Swal.fire({
            title: "Cuenta eliminada exitosamente",
            icon: "success",
            draggable: true
          });
        },
        error: () => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hubo un error al eliminar tu cuenta",
          });
        }
      });
    }
  });
}


  editar() {
    this.editando = true;
  }
  cancelar() {
    this.editando = false;
    this.nuevoNombre = this.nombre;
  }
  guardar() {
    if (this.nuevoNombre == this.nombre) {
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Debes escribir un nombre distinto",
        });
      return;
    }
    this.loginService.updateUser({name: this.nuevoNombre}).subscribe({
      next: (response) => {
        this.nombre = this.nuevoNombre;
        localStorage.setItem('nombreUsuario', this.nombre);
        this.editando = false;
        Swal.fire({
          title: "Usuario actualizado correctamente",
          icon: "success",
          draggable: true
        });
      },
      error:() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al actualizar el usuario",
        });
      }
    });
  }
  
  logout() {
    this.loginService.logout();
    this.router.navigate(["/login"]);
  }
}
