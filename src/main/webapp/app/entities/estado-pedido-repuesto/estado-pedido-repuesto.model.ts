import { BaseEntity } from './../../shared';

export class EstadoPedidoRepuesto implements BaseEntity {
    constructor(
        public id?: number,
        public nombreEstado?: string,
    ) {
    }
}
