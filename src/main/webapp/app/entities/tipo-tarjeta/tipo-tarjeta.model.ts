import { BaseEntity } from './../../shared';

export class TipoTarjeta implements BaseEntity {
    constructor(
        public id?: number,
        public nombreTipoTarjeta?: string,
    ) {
    }
}
