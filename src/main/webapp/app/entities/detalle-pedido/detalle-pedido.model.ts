import { CostoRepuesto } from './../costo-repuesto/costo-repuesto.model';
import { IDetallePresupuesto } from 'app/entities/detalle-presupuesto/detalle-presupuesto.model';

export interface IDetallePedido {
  id?: number;
  detallePresupuesto?: IDetallePresupuesto;
  costoRepuestos?: CostoRepuesto[];
}

export class DetallePedido implements IDetallePedido {
  constructor(public id?: number, public detallePresupuesto?: IDetallePresupuesto, public costoRepuestos?: CostoRepuesto[]) {}
}

export function getDetallePedidoIdentifier(detallePedido: IDetallePedido): number | undefined {
  return detallePedido.id;
}
