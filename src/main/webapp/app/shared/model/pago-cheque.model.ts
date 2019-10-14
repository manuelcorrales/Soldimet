import { Moment } from 'moment';
import { IBanco } from 'app/shared/model/banco.model';
import { IFormaDePago } from 'app/shared/model/forma-de-pago.model';

export interface IPagoCheque {
  id?: number;
  fechaCobro?: Moment;
  fechaRecibo?: Moment;
  numeroCheque?: string;
  numeroCuenta?: string;
  banco?: IBanco;
  formaDePago?: IFormaDePago;
}

export class PagoCheque implements IPagoCheque {
  constructor(
    public id?: number,
    public fechaCobro?: Moment,
    public fechaRecibo?: Moment,
    public numeroCheque?: string,
    public numeroCuenta?: string,
    public banco?: IBanco,
    public formaDePago?: IFormaDePago
  ) {}
}
