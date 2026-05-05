export class Review {
    id: number;
    contenido: string;
    id_persona: number;
    id_pension: number;

    public constructor(id: number, contenido: string, id_persona: number, id_pension: number) {
        this.id = id;
        this.contenido = contenido;
        this.id_pension = id_pension;
        this.id_persona = id_persona;
    }
}