import { IPedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';
import { IMovimiento } from 'app/shared/model/movimiento.model';

export interface IMovimientoPedido {
  id?: number;
  pedidoRepuesto?: IPedidoRepuesto;
  movimiento?: IMovimiento;
}

export class MovimientoPedido implements IMovimientoPedido {
  constructor(public id?: number, public pedidoRepuesto?: IPedidoRepuesto, public movimiento?: IMovimiento) {}
}
