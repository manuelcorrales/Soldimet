import { BaseEntity } from './../../shared';

export class PagoTarjeta implements BaseEntity {
    constructor(
        public id?: number,
        public numeroTarjeta?: string,
        public formaDePago?: BaseEntity,
        public tarjeta?: BaseEntity,
        public tipoTarjeta?: BaseEntity,
    ) {
    }
}
