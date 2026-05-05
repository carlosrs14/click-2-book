import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../../models/reserva';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  constructor(private http: HttpClient) { }

  public createReserva(reserva: Reserva): Observable<any>{
    return this.http.post(environment.apiUrl + "reservas", {reserva});
  }

  public updateReserva(reserva: Reserva): Observable<any> {
    return this.http.put(environment.apiUrl + `reservas/${reserva.id}`, {reserva});
  }

  public getReservas(): Observable<any> {
    return this.http.get(environment.apiUrl + "reservas");
  }
  
  public getReserva(id: number): Observable<any> {
    return this.http.get(environment.apiUrl + `reservas/${id}`);
  }
  
  public getByUser(idUsuario: number): Observable<any> {
    return this.http.get(environment.apiUrl + `users/${idUsuario}/reservas`);
  }

  public deleteReserva(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + `reservas/${id}`);
  }
} 
