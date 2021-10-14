import { IFormaDePago } from 'app/entities/forma-de-pago/forma-de-pago.model';
import { IBanco } from 'app/entities/banco/banco.model';

export interface IPagoCheque {
  id?: number;
  numeroCheque?: string;
  formaDePago?: IFormaDePago;
  banco?: IBanco;
}

export class PagoCheque implements IPagoCheque {
  constructor(public id?: number, public numeroCheque?: string, public formaDePago?: IFormaDePago, public banco?: IBanco) {}
}

export function getPagoChequeIdentifier(pagoCheque: IPagoCheque): number | undefined {
  return pagoCheque.id;
}
