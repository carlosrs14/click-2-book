export class Valoracion {
    id: number;
    valoracion: number;
    id_persona: number;
    id_pension: number;

    public constructor(id: number, valoracion: number, id_persona: number, id_pension: number) {
        this.id = id;
        this.valoracion = valoracion;
        this.id_pension = id_pension;
        this.id_persona = id_persona;
    }
}