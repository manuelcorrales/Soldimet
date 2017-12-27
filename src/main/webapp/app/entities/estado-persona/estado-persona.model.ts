import { BaseEntity } from './../../shared';

export class EstadoPersona implements BaseEntity {
    constructor(
        public id?: number,
        public nombreEstado?: string,
    ) {
    }
}
