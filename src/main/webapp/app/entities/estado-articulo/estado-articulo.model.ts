import { BaseEntity } from './../../shared';

export class EstadoArticulo implements BaseEntity {
    constructor(
        public id?: number,
        public nombreEstado?: string,
    ) {
    }
}
