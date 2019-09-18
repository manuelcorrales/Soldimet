import { Moment } from 'moment';
import { IEstadoPedidoRepuesto } from 'app/shared/model/estado-pedido-repuesto.model';
import { IDetallePedido } from 'app/shared/model/detalle-pedido.model';
import { IPresupuesto } from 'app/shared/model/presupuesto.model';
import { IDocumentationType } from 'app/shared/model/documentation-type.model';

export interface IPedidoRepuesto {
    id?: number;
    fechaCreacion?: Moment;
    fechaPedido?: Moment;
    fechaRecibo?: Moment;
    estadoPedidoRepuesto?: IEstadoPedidoRepuesto;
    detallePedidos?: IDetallePedido[];
    presupuesto?: IPresupuesto;
    documentType?: IDocumentationType;
}

export class PedidoRepuesto implements IPedidoRepuesto {
    constructor(
        public id?: number,
        public fechaCreacion?: Moment,
        public fechaPedido?: Moment,
        public fechaRecibo?: Moment,
        public estadoPedidoRepuesto?: IEstadoPedidoRepuesto,
        public detallePedidos?: IDetallePedido[],
        public presupuesto?: IPresupuesto,
        public documentType?: IDocumentationType
    ) {}
}
