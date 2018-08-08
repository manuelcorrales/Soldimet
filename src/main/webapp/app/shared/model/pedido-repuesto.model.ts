import { Moment } from 'moment';
import { IEstadoPedidoRepuesto } from 'app/shared/model/estado-pedido-repuesto.model';
import { IDetallePedido } from 'app/shared/model/detalle-pedido.model';
import { IPresupuesto } from 'app/shared/model/presupuesto.model';

export interface IPedidoRepuesto {
    id?: number;
    fechaCreacion?: Moment;
    fechaPedido?: Moment;
    fechaRecibo?: Moment;
    estadoPedidoRepuesto?: IEstadoPedidoRepuesto;
    detallePedidos?: IDetallePedido[];
    presupuesto?: IPresupuesto;
}

export class PedidoRepuesto implements IPedidoRepuesto {
    constructor(
        public id?: number,
        public fechaCreacion?: Moment,
        public fechaPedido?: Moment,
        public fechaRecibo?: Moment,
        public estadoPedidoRepuesto?: IEstadoPedidoRepuesto,
        public detallePedidos?: IDetallePedido[],
        public presupuesto?: IPresupuesto
    ) {}
}
