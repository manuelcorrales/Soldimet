import { BaseEntity } from './../../shared';

export class Localidad implements BaseEntity {
    constructor(
        public id?: number,
        public nombreLocalidad?: string,
    ) {
    }
}
