export interface ITarjeta {
    id?: number;
    nombreTarjeta?: string;
}

export class Tarjeta implements ITarjeta {
    constructor(public id?: number, public nombreTarjeta?: string) {}
}
