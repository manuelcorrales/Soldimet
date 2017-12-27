import { BaseEntity } from './../../shared';

export class DetallePedido implements BaseEntity {
    constructor(
        public id?: number,
        public cantidadArticulo?: number,
        public precioRespuesto?: number,
        public articulo?: BaseEntity,
    ) {
    }
}
