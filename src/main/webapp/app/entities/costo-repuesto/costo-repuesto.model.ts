import { BaseEntity } from './../../shared';

export class CostoRepuesto implements BaseEntity {
    constructor(
        public id?: number,
        public valor?: number,
        public tipoRepuesto?: BaseEntity,
        public articulo?: BaseEntity,
        public proveedor?: BaseEntity,
    ) {
    }
}
