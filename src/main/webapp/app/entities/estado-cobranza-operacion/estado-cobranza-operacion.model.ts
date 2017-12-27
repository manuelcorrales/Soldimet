import { BaseEntity } from './../../shared';

export class EstadoCobranzaOperacion implements BaseEntity {
    constructor(
        public id?: number,
        public nombreEstado?: string,
    ) {
    }
}
