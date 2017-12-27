import { BaseEntity } from './../../shared';

export class PrecioRepuesto implements BaseEntity {
    constructor(
        public id?: number,
        public fecha?: any,
        public precioPrivado?: number,
        public precioPublico?: number,
    ) {
    }
}
