export interface ITipoTarjeta {
  id?: number;
  nombreTipoTarjeta?: string;
}

export class TipoTarjeta implements ITipoTarjeta {
  constructor(public id?: number, public nombreTipoTarjeta?: string) {}
}
