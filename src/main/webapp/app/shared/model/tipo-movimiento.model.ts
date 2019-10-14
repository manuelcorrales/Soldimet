export interface ITipoMovimiento {
  id?: number;
  nombreTipoMovimiento?: string;
}

export class TipoMovimiento implements ITipoMovimiento {
  constructor(public id?: number, public nombreTipoMovimiento?: string) {}
}
