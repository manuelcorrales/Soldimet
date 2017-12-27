import { BaseEntity } from './../../shared';

export class HistorialPrecio implements BaseEntity {
    constructor(
        public id?: number,
        public fechaHistorial?: any,
        public precioRepuesto?: BaseEntity,
    ) {
    }
}
