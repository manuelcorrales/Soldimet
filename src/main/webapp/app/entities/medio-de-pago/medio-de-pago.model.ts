import { IMedioDePagoCheque } from 'app/entities/medio-de-pago-cheque/medio-de-pago-cheque.model';
import { IFormaDePago } from 'app/entities/forma-de-pago/forma-de-pago.model';

export interface IMedioDePago {
  id?: number;
  medioDePagoCheque?: IMedioDePagoCheque | null;
  formaDePago?: IFormaDePago;
}

export class MedioDePago implements IMedioDePago {
  constructor(public id?: number, public medioDePagoCheque?: IMedioDePagoCheque | null, public formaDePago?: IFormaDePago) {}
}

export function getMedioDePagoIdentifier(medioDePago: IMedioDePago): number | undefined {
  return medioDePago.id;
}
