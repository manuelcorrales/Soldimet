import { IBanco } from 'app/shared/model/banco.model';
import { IFormaDePago } from 'app/shared/model/forma-de-pago.model';

export interface IPagoCheque {
  id?: number;
  numeroCheque?: string;
  banco?: IBanco;
  formaDePago?: IFormaDePago;
}

export class PagoCheque implements IPagoCheque {
  constructor(public id?: number, public numeroCheque?: string, public banco?: IBanco, public formaDePago?: IFormaDePago) {}
}
