export interface IEstadoMovimiento {
  id?: number;
  nombreEstado?: string;
}

export class EstadoMovimiento implements IEstadoMovimiento {
  constructor(public id?: number, public nombreEstado?: string) {}
}

export function getEstadoMovimientoIdentifier(estadoMovimiento: IEstadoMovimiento): number | undefined {
  return estadoMovimiento.id;
}
