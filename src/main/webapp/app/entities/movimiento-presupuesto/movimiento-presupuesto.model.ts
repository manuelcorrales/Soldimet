import { BaseEntity } from './../../shared';

export class MovimientoPresupuesto implements BaseEntity {
    constructor(
        public id?: number,
        public presupuesto?: BaseEntity,
        public movimiento?: BaseEntity,
    ) {
    }
}
