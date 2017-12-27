import { BaseEntity } from './../../shared';

export class TipoMovimiento implements BaseEntity {
    constructor(
        public id?: number,
        public nombreTipoMovimiento?: string,
    ) {
    }
}
