import { BaseEntity } from './../../shared';

export class Articulo implements BaseEntity {
    constructor(
        public id?: number,
        public descripcion?: string,
        public estado?: BaseEntity,
    ) {
    }
}
