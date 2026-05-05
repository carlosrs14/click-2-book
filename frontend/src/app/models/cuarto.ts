export class Cuarto {
    id: number;
    valorMensual: number;
    capacidad: number;
    tieneAire: boolean;
    descripcion: string;
    propiedad_id: number;

    public constructor(id: number, valorMensual: number, capacidad: number, tieneAire: boolean, descripcion: string, propiedad_id: number) {
        this.id = id;
        this.valorMensual = valorMensual;
        this.capacidad = capacidad;
        this.tieneAire = tieneAire;
        this.descripcion = descripcion;
        this.propiedad_id = propiedad_id;
    }
}