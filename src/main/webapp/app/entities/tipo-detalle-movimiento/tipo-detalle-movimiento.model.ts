import { BaseEntity } from './../../shared';

export class TipoDetalleMovimiento implements BaseEntity {
    constructor(
        public id?: number,
        public nombreTipoDetalle?: string,
    ) {
    }
}
