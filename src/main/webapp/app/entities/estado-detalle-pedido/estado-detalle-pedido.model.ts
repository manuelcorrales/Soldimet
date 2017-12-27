import { BaseEntity } from './../../shared';

export class EstadoDetallePedido implements BaseEntity {
    constructor(
        public id?: number,
        public nombreEstado?: string,
    ) {
    }
}
