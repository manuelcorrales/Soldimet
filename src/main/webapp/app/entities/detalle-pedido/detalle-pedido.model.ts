import { BaseEntity } from './../../shared';

export class DetallePedido implements BaseEntity {
    constructor(
        public id?: number,
        public detallePresupuesto?: BaseEntity,
        public costoRepuestos?: BaseEntity[],
    ) {
    }
}
