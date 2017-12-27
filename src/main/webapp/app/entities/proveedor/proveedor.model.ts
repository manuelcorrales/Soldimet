import { BaseEntity } from './../../shared';

export class Proveedor implements BaseEntity {
    constructor(
        public id?: number,
        public persona?: BaseEntity,
    ) {
    }
}
