import { BaseEntity } from './../../shared';

export class Marca implements BaseEntity {
    constructor(
        public id?: number,
        public nombreMarca?: string,
    ) {
    }
}
