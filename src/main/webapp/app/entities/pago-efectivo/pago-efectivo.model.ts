import { BaseEntity } from './../../shared';

export class PagoEfectivo implements BaseEntity {
    constructor(
        public id?: number,
        public formaDePago?: BaseEntity,
    ) {
    }
}
