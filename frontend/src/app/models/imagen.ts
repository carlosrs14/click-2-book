export class Imagen {
    id: number;
    url: string;
    imagen: File|null;
    propiedad_id: number;

    constructor(id: number, url: string, imagen: File|null, propiedad_id: number) {
        this.id = id;
        this.url = url;
        this.imagen = imagen;
        this.propiedad_id = propiedad_id;
    }
}