import { BaseEntity } from './../../shared';

export class Banco implements BaseEntity {
    constructor(
        public id?: number,
        public nombreBanco?: string,
    ) {
    }
}
