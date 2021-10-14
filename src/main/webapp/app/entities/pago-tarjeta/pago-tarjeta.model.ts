import { IFormaDePago } from 'app/entities/forma-de-pago/forma-de-pago.model';

export interface IPagoTarjeta {
  id?: number;
  formaDePago?: IFormaDePago;
}

export class PagoTarjeta implements IPagoTarjeta {
  constructor(public id?: number, public formaDePago?: IFormaDePago) {}
}

export function getPagoTarjetaIdentifier(pagoTarjeta: IPagoTarjeta): number | undefined {
  return pagoTarjeta.id;
}
