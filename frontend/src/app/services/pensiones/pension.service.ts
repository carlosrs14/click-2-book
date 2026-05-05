import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Pension } from '../../models/pension';

@Injectable({
  providedIn: 'root'
})
export class PensionService {

    constructor(private http: HttpClient) { }
    

    public createPension(pension: Pension): Observable<any> {
      	return this.http.post(environment.apiUrl + "propiedades", {
        	esambientefamiliar: pension.esAmbienteFamiliar,
        	escupocompleto: pension.esCupoCompleto,
			direccion: pension.direccion,
			descripcion: pension.descripcion,
			user_id: pension.user_id,
			tipopropiedad_id: pension.tipopropiedad_id,
			barrio_id: pension.barrio_id
      	});
    }

    public filterByPropietario(idPropietario: number): Observable<any> {
      	return this.http.get(environment.apiUrl + `propietarios/${idPropietario}/propiedades`);
    }

    public getPensiones(): Observable<any> {
      	return this.http.get(environment.apiUrl + "propiedades");
    }

    public getPension(id: number): Observable<any>  {
      	return this.http.get(environment.apiUrl + `propiedades/${id}`);
    }
    
    public updatePension(pension: Pension): Observable<any> {
      	return this.http.put(environment.apiUrl + `propiedades/${pension.id}`, {
			esambientefamiliar: pension.esAmbienteFamiliar,
			escupocompleto: pension.esCupoCompleto,
			descripcion: pension.descripcion
     	});
    }

    public deletePension(id: number): Observable<any>  {
      	return this.http.delete(environment.apiUrl + `propiedades/${id}`);
    }

    getTiposPropiedad(): Observable<any> {
      	return this.http.get(`${environment.apiUrl}tipos-propiedad`);
    }

    public filtrarPensiones(tipo_id: number, barrio_id: number, precioMinimo: number, precioMaximo: number, cupoCompleto:boolean, ambienteFamiliar: boolean, individual: boolean, aire: boolean): Observable<any> {
      	return this.http.get(environment.apiUrl +  `propiedadesfiltro`, {
			params: {
				tipo: tipo_id,
				barrio: barrio_id,
				precioMin: precioMinimo,
				precioMax: precioMaximo,
				cupoCompleto: cupoCompleto,
				ambienteFamiliar: ambienteFamiliar,
				individual: individual,
				aire: aire
        	}
      	});
    }
}

