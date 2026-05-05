import { Imagen } from "./imagen";

export class Pension {
    id: number;
    esAmbienteFamiliar: boolean;
    esCupoCompleto: boolean;
    direccion: string;
    tipo: string;
    descripcion: string;
	barrio_id: number;
	tipopropiedad_id: number;;
	user_id: number;
	images: string[];

    public constructor(id: number, user_id: number, esAmbienteFamiliar: boolean, esCupoCompleto: boolean, direccion: string, tipo: string, descripcion: string, barrio_id: number, tipopropiedad_id: number) {
		this.id = id;
		this.user_id = user_id;
		this.esAmbienteFamiliar = esAmbienteFamiliar;
		this.esCupoCompleto = esCupoCompleto;
		this.direccion = direccion;
		this.tipo = tipo;
		this.descripcion = descripcion;
		this.barrio_id = barrio_id;
		this.tipopropiedad_id = tipopropiedad_id;
		this.images = [];
	}

	public addImgen(imagen: string) {
		this.images.push(imagen);
	}
}