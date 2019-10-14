export interface IEstadoDetallePedido {
  id?: number;
  nombreEstado?: string;
}

export class EstadoDetallePedido implements IEstadoDetallePedido {
  constructor(public id?: number, public nombreEstado?: string) {}
}
