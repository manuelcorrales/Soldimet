export interface IEstadoCostoRepuesto {
  id?: number;
  nombreEstado?: string;
}

export class EstadoCostoRepuesto implements IEstadoCostoRepuesto {
  constructor(public id?: number, public nombreEstado?: string) {}
}

export function getEstadoCostoRepuestoIdentifier(estadoCostoRepuesto: IEstadoCostoRepuesto): number | undefined {
  return estadoCostoRepuesto.id;
}
