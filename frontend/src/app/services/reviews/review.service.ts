import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../../models/review';
import { Valoracion } from '../../models/valoracion';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private http: HttpClient) { }

  public createReview(review: Review): Observable<any> {
    return this.http.post(environment.apiUrl + "reviews", {review});
  }

  public deleteReview(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + `reviews/${id}`);
  }

  public filterByPropiedadReview(idPropiedad: number): Observable<any> {
    return this.http.get(environment.apiUrl + `propiedades/${idPropiedad}/reviews`);
  }

  public createValoracion(valoracion: Valoracion): Observable<any> {
    return this.http.post(environment.apiUrl + "valoraciones", {valoracion});
  }

  public deleteValoracion(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + `valoraciones/${id}`);
  }

  public filterByPropiedadValoracion(idPropiedad: number): Observable<any> {
    return this.http.get(environment.apiUrl + `propiedades/${idPropiedad}/valoraciones`);
  }



  
}
