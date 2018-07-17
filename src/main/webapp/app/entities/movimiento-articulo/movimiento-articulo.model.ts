import { BaseEntity } from './../../shared';

export class MovimientoArticulo implements BaseEntity {
    constructor(
        public id?: number,
        public cantidad?: number,
        public articulo?: BaseEntity,
        public movimiento?: BaseEntity,
    ) {
    }
}
