import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service';
import {Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private router: Router){}
  login() {
    if (!this.email || !this.password) {
     Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error en el inicio de sesión",
        });
      return;
    }
    this.loginService.login(this.email, this.password).subscribe(response => {
      localStorage.setItem("tokenAcceso", response.access_token);
      localStorage.setItem("idUsuario", response.user_id);
      localStorage.setItem("nombreUsuario", response.user_name);
      localStorage.setItem("rolUsuario", response.rol);
      localStorage.setItem("emailUsuario", response.user_email);
      this.router.navigate(["/pensiones"]);
      
      if (!localStorage.getItem("nombreUsuario")) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error en el inicio de sesión",
        });
      }
    });
  }
}
