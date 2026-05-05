import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Imagen } from '../../models/imagen';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  constructor(private http: HttpClient) { }

	createImagen(idPropiedad: number, imagen: Imagen) {
		const form = new FormData();
		if (imagen.imagen) {
			form.append('image', imagen.imagen);
		}
		return this.http.post(environment.apiUrl + `propiedades/${idPropiedad}/images`, form);
	}
}
