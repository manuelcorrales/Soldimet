import { BaseEntity } from './../../shared';

export class Articulo implements BaseEntity {
    constructor(
        public id?: number,
        public descripcion?: string,
        public codigoArticuloProveedor?: string,
        public estado?: BaseEntity,
        public marca?: BaseEntity,
        public tipoRepuesto?: BaseEntity,
    ) {
    }
}
