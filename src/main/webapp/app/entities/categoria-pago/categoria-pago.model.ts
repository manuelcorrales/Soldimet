import { BaseEntity } from './../../shared';

export class CategoriaPago implements BaseEntity {
    constructor(
        public id?: number,
        public nombreCategoriaPago?: string,
    ) {
    }
}
