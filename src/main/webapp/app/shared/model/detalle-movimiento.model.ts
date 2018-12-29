import { ITipoDetalleMovimiento } from 'app/shared/model/tipo-detalle-movimiento.model';
import { IArticulo } from 'app/shared/model/articulo.model';
import { IPedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';
import { IPresupuesto } from 'app/shared/model/presupuesto.model';

export interface IDetalleMovimiento {
    id?: number;
    valor_unitario?: number;
    cantidad?: number;
    tipoDetalleMovimiento?: ITipoDetalleMovimiento;
    articulo?: IArticulo;
    pedidoRepuesto?: IPedidoRepuesto;
    presupuesto?: IPresupuesto;
}

export class DetalleMovimiento implements IDetalleMovimiento {
    constructor(
        public id?: number,
        public valor_unitario?: number,
        public cantidad?: number,
        public tipoDetalleMovimiento?: ITipoDetalleMovimiento,
        public articulo?: IArticulo,
        public pedidoRepuesto?: IPedidoRepuesto,
        public presupuesto?: IPresupuesto
    ) {}
}
