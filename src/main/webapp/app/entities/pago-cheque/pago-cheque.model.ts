import { BaseEntity } from './../../shared';

export class PagoCheque implements BaseEntity {
    constructor(
        public id?: number,
        public fechaCobro?: any,
        public fechaRecibo?: any,
        public numeroCheque?: string,
        public numeroCuenta?: string,
        public banco?: BaseEntity,
        public formaDePago?: BaseEntity,
    ) {
    }
}
