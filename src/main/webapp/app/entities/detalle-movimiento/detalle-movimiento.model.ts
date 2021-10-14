import { ITipoDetalleMovimiento } from 'app/entities/tipo-detalle-movimiento/tipo-detalle-movimiento.model';
import { IArticulo } from 'app/entities/articulo/articulo.model';
import { IPedidoRepuesto } from 'app/entities/pedido-repuesto/pedido-repuesto.model';
import { IPresupuesto } from 'app/entities/presupuesto/presupuesto.model';
import { IMedidaArticulo } from 'app/entities/medida-articulo/medida-articulo.model';

export interface IDetalleMovimiento {
  id?: number;
  valorUnitario?: number | null;
  cantidad?: number;
  descripcion?: string | null;
  tipoDetalleMovimiento?: ITipoDetalleMovimiento;
  articulo?: IArticulo | null;
  pedidoRepuesto?: IPedidoRepuesto | null;
  presupuesto?: IPresupuesto | null;
  medida?: IMedidaArticulo | null;
}

export class DetalleMovimiento implements IDetalleMovimiento {
  constructor(
    public id?: number,
    public valorUnitario?: number | null,
    public cantidad?: number,
    public descripcion?: string | null,
    public tipoDetalleMovimiento?: ITipoDetalleMovimiento,
    public articulo?: IArticulo | null,
    public pedidoRepuesto?: IPedidoRepuesto | null,
    public presupuesto?: IPresupuesto | null,
    public medida?: IMedidaArticulo | null
  ) {}
}

export function getDetalleMovimientoIdentifier(detalleMovimiento: IDetalleMovimiento): number | undefined {
  return detalleMovimiento.id;
}
