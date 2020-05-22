import { IFormaDePago } from 'app/shared/model/forma-de-pago.model';

export interface IPagoTarjeta {
  id?: number;
  formaDePago?: IFormaDePago;
}

export class PagoTarjeta implements IPagoTarjeta {
  constructor(public id?: number, public formaDePago?: IFormaDePago) {}
}
