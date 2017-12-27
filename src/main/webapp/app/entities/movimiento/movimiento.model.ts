import { BaseEntity } from './../../shared';

export class Movimiento implements BaseEntity {
    constructor(
        public id?: number,
        public fecha?: any,
        public hora?: any,
        public importe?: number,
        public estado?: BaseEntity,
        public formaDePago?: BaseEntity,
        public tipoMovimiento?: BaseEntity,
        public detalleMovimientos?: BaseEntity[],
        public empleado?: BaseEntity,
        public persona?: BaseEntity,
        public subCategoria?: BaseEntity,
    ) {
    }
}
