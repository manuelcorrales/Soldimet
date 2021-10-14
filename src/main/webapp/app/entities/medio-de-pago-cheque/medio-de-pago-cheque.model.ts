import { IBanco } from 'app/entities/banco/banco.model';

export interface IMedioDePagoCheque {
  id?: number;
  numeroCheque?: string;
  banco?: IBanco;
}

export class MedioDePagoCheque implements IMedioDePagoCheque {
  constructor(public id?: number, public numeroCheque?: string, public banco?: IBanco) {}
}

export function getMedioDePagoChequeIdentifier(medioDePagoCheque: IMedioDePagoCheque): number | undefined {
  return medioDePagoCheque.id;
}
