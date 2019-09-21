export interface ITipoDetalleMovimiento {
  id?: number;
  nombreTipoDetalle?: string;
}

export class TipoDetalleMovimiento implements ITipoDetalleMovimiento {
  constructor(public id?: number, public nombreTipoDetalle?: string) {}
}
