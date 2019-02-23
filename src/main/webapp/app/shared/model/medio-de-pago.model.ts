import { IFormaDePago } from 'app/shared/model/forma-de-pago.model';

export interface IMedioDePago {
    id?: number;
    formaDePago?: IFormaDePago;
}

export class MedioDePago implements IMedioDePago {
    constructor(public id?: number, public formaDePago?: IFormaDePago) {}
}
