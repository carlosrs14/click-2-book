export class Telefono {
    id: number;
    numero: string;
    usuario_id: number;
    constructor(id: number, numero: string, usuario_id: number) {
        this.id = id;
        this.numero = numero;
        this.usuario_id = usuario_id;
    }
}