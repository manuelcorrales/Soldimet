import { BaseEntity } from './../../shared';

export class Presupuesto implements BaseEntity {
    constructor(
        public id?: number,
        public descripcionDescuento?: string,
        public descuento?: number,
        public fechaCreacion?: any,
        public fechaAceptado?: any,
        public fechaEntregado?: any,
        public importeTotal?: number,
        public observaciones?: string,
        public cliente?: BaseEntity,
        public estadoPresupuesto?: BaseEntity,
        public detallePresupuestos?: BaseEntity[],
    ) {
    }
}
