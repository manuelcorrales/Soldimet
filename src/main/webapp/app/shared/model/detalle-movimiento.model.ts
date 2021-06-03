import { ITipoDetalleMovimiento } from 'app/shared/model/tipo-detalle-movimiento.model';
import { IArticulo } from 'app/shared/model/articulo.model';
import { IPedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';
import { IPresupuesto } from 'app/shared/model/presupuesto.model';
import { IMedidaArticulo } from 'app/shared/model/medida-articulo.model';

export interface IDetalleMovimiento {
  id?: number;
  valorUnitario?: number;
  cantidad?: number;
  descripcion?: string;
  tipoDetalleMovimiento?: ITipoDetalleMovimiento;
  articulo?: IArticulo;
  pedidoRepuesto?: IPedidoRepuesto;
  presupuesto?: IPresupuesto;
  medida?: IMedidaArticulo;
}

export class DetalleMovimiento implements IDetalleMovimiento {
  constructor(
    public id?: number,
    public valorUnitario?: number,
    public cantidad?: number,
    public descripcion?: string,
    public tipoDetalleMovimiento?: ITipoDetalleMovimiento,
    public articulo?: IArticulo,
    public pedidoRepuesto?: IPedidoRepuesto,
    public presupuesto?: IPresupuesto,
    public medida?: IMedidaArticulo
  ) {}
}
