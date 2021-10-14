import { IDetallePresupuesto } from 'app/entities/detalle-presupuesto/detalle-presupuesto.model';

export interface IDetallePedido {
  id?: number;
  detallePresupuesto?: IDetallePresupuesto;
}

export class DetallePedido implements IDetallePedido {
  constructor(public id?: number, public detallePresupuesto?: IDetallePresupuesto) {}
}

export function getDetallePedidoIdentifier(detallePedido: IDetallePedido): number | undefined {
  return detallePedido.id;
}
