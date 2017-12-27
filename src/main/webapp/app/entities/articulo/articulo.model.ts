import { BaseEntity } from './../../shared';

export class Articulo implements BaseEntity {
    constructor(
        public id?: number,
        public descripcion?: string,
        public codigoArticuloProveedor?: string,
        public estado?: BaseEntity,
        public rubro?: BaseEntity,
        public marca?: BaseEntity,
        public historialPrecios?: BaseEntity[],
        public proveedor?: BaseEntity,
        public tipoRepuesto?: BaseEntity,
    ) {
    }
}
