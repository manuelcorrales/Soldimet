import { IMovimiento } from 'app/entities/movimiento/movimiento.model';
import { IPedidoRepuesto } from 'app/entities/pedido-repuesto/pedido-repuesto.model';

export interface IMovimientoPedido {
  id?: number;
  movimiento?: IMovimiento;
  pedidoRepuesto?: IPedidoRepuesto;
}

export class MovimientoPedido implements IMovimientoPedido {
  constructor(public id?: number, public movimiento?: IMovimiento, public pedidoRepuesto?: IPedidoRepuesto) {}
}

export function getMovimientoPedidoIdentifier(movimientoPedido: IMovimientoPedido): number | undefined {
  return movimientoPedido.id;
}
