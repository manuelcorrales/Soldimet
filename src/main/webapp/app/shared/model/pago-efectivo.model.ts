import { IFormaDePago } from 'app/shared/model/forma-de-pago.model';

export interface IPagoEfectivo {
  id?: number;
  formaDePago?: IFormaDePago;
}

export class PagoEfectivo implements IPagoEfectivo {
  constructor(public id?: number, public formaDePago?: IFormaDePago) {}
}
