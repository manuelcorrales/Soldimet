import { BaseEntity } from './../../shared';

export class MovimientoPedido implements BaseEntity {
    constructor(
        public id?: number,
        public pedidoRepuesto?: BaseEntity,
        public movimiento?: BaseEntity,
    ) {
    }
}
