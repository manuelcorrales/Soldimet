import { BaseEntity } from './../../shared';

export class PedidoRepuesto implements BaseEntity {
    constructor(
        public id?: number,
        public fechaCreacion?: any,
        public fechaPedido?: any,
        public fechaRecibo?: any,
        public estadoPedidoRepuesto?: BaseEntity,
        public detallePedidos?: BaseEntity[],
        public presupuesto?: BaseEntity,
    ) {
    }
}
