import { IFormaDePago } from 'app/entities/forma-de-pago/forma-de-pago.model';

export interface IPagoEfectivo {
  id?: number;
  formaDePago?: IFormaDePago;
}

export class PagoEfectivo implements IPagoEfectivo {
  constructor(public id?: number, public formaDePago?: IFormaDePago) {}
}

export function getPagoEfectivoIdentifier(pagoEfectivo: IPagoEfectivo): number | undefined {
  return pagoEfectivo.id;
}
