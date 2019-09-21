export interface IEstadoOperacion {
  id?: number;
  nombreEstado?: string;
}

export class EstadoOperacion implements IEstadoOperacion {
  constructor(public id?: number, public nombreEstado?: string) {}
}
