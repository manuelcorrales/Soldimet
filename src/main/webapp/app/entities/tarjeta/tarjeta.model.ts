import { BaseEntity } from './../../shared';

export class Tarjeta implements BaseEntity {
    constructor(
        public id?: number,
        public nombreTarjeta?: string,
    ) {
    }
}
