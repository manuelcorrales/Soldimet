import { IFormaDePago } from 'app/shared/model/forma-de-pago.model';
import { IMedioDePagoCheque } from 'app/shared/model/medio-de-pago-cheque.model';
import { IMedioDePagoTarjeta } from 'app/shared/model/medio-de-pago-tarjeta.model';

export interface IMedioDePago {
  id?: number;
  formaDePago?: IFormaDePago;
  medioDePagoCheque?: IMedioDePagoCheque;
  medioDePagoTarjeta?: IMedioDePagoTarjeta;
}

export class MedioDePago implements IMedioDePago {
  constructor(
    public id?: number,
    public formaDePago?: IFormaDePago,
    public medioDePagoCheque?: IMedioDePagoCheque,
    public medioDePagoTarjeta?: IMedioDePagoTarjeta
  ) {}
}
