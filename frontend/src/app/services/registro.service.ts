import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RegistroService {
  constructor(private http: HttpClient) {}
  register(name: string, last_name: string, email: string, password: string, password_confirmation: string, birth_date: Date, rol_id: number ): Observable <any> {
    return this.http.post(environment.apiUrl + "register/", {
      name,
      last_name,
      email,
      password,
      password_confirmation,
      birth_date,
      rol_id
    });
  }
}
