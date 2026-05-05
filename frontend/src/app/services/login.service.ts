import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private http: HttpClient) {}
  
  login(email: string, password: string): Observable<any> {
    return this.http.post(environment.apiUrl + "login", {email, password});
  }

  isLoggedIn() : Boolean {
    return !!localStorage.getItem("tokenAcceso");
  }
  
  logout(): void {
    localStorage.clear();
  }

  deleteUser(): Observable<any> {
    const id = Number.parseInt(localStorage.getItem("idUsuario") || "0"); 
    const token = localStorage.getItem("tokenAcceso") || ""; 
    return this.http.delete(`${environment.apiUrl}users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  }

  updateUser(data:any): Observable<any> {
    const id = Number.parseInt(localStorage.getItem("idUsuario") || "0"); 
    const token = localStorage.getItem("tokenAcceso") || ""; 
    return this.http.put(`${environment.apiUrl}users/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  }
}
