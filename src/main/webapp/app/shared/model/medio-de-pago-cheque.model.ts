import { Moment } from 'moment';
import { IBanco } from 'app/shared/model/banco.model';

export interface IMedioDePagoCheque {
  id?: number;
  fechaRecibo?: Moment;
  fechaCobro?: Moment;
  numeroCheque?: string;
  numeroCuenta?: string;
  banco?: IBanco;
}

export class MedioDePagoCheque implements IMedioDePagoCheque {
  constructor(
    public id?: number,
    public fechaRecibo?: Moment,
    public fechaCobro?: Moment,
    public numeroCheque?: string,
    public numeroCuenta?: string,
    public banco?: IBanco
  ) {}
}
