export class Barrio {
    id: number;
    nombre: string;
    ciudad_id: number;
    
    public constructor(id: number, nombre: string, ciudad_id: number) {
        this.id = id;
        this.nombre = nombre;
        this.ciudad_id = ciudad_id;
    }
}