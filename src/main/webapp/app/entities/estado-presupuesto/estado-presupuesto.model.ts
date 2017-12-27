import { BaseEntity } from './../../shared';

export class EstadoPresupuesto implements BaseEntity {
    constructor(
        public id?: number,
        public nombreEstado?: string,
    ) {
    }
}
