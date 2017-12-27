import { BaseEntity } from './../../shared';

export class EstadoOperacion implements BaseEntity {
    constructor(
        public id?: number,
        public nombreEstado?: string,
    ) {
    }
}
