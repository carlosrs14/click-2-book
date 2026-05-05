import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocacionService {

  constructor(private http: HttpClient) { }

  public getCiudades(): Observable<any> {
    return this.http.get(environment.apiUrl + "ciudades");
  }

  public filtrarBarriosPorCiudad(idCiudad: number): Observable<any> {
    return this.http.get(environment.apiUrl + `ciudades/${idCiudad}/barrios`);
  }

  public getBarrios(): Observable<any> {
    return this.http.get(environment.apiUrl + "barrios");
  }
}
