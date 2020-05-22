import { IBanco } from 'app/shared/model/banco.model';

export interface IMedioDePagoCheque {
  id?: number;
  numeroCheque?: string;
  banco?: IBanco;
}

export class MedioDePagoCheque implements IMedioDePagoCheque {
  constructor(public id?: number, public numeroCheque?: string, public banco?: IBanco) {}
}
