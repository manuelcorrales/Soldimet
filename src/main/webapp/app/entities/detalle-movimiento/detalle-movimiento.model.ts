import { BaseEntity } from './../../shared';

export class DetalleMovimiento implements BaseEntity {
    constructor(
        public id?: number,
        public tipoDetalleMovimiento?: BaseEntity,
        public presupuesto?: BaseEntity,
    ) {
    }
}
