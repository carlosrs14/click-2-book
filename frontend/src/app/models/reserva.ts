export class Reserva {
    id: number;
    //pago_id: number;
    tiporeserva_id: number;
    user_id: number;
    cuarto_id: number;
    inicio: string;
    fin: string;
    cantidad_pensionados: number;
    public constructor(id: number, user_id: number, cuarto_id: number, inicio: string, fin: string, cantidad_pensionados: number) {
        this.id = id;
        // this.pago_id = 0;
        this.tiporeserva_id = 1;
        this.user_id = user_id;
        this.cuarto_id = cuarto_id;
        this.inicio = inicio;
        this.fin = fin;
        this.cantidad_pensionados = cantidad_pensionados;
    }

}