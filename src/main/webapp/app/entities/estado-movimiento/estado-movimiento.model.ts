import { BaseEntity } from './../../shared';

export class EstadoMovimiento implements BaseEntity {
    constructor(
        public id?: number,
        public nombreEstado?: string,
    ) {
    }
}
