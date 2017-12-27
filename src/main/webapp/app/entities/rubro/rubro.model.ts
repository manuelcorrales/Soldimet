import { BaseEntity } from './../../shared';

export class Rubro implements BaseEntity {
    constructor(
        public id?: number,
        public nombreRubro?: string,
    ) {
    }
}
