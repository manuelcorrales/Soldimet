export interface IEstadoPresupuesto {
  id?: number;
  nombreEstado?: string;
}

export class EstadoPresupuesto implements IEstadoPresupuesto {
  constructor(public id?: number, public nombreEstado?: string) {}
}
