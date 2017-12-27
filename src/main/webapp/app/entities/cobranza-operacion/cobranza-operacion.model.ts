import { BaseEntity } from './../../shared';

export class CobranzaOperacion implements BaseEntity {
    constructor(
        public id?: number,
        public cobranzaOperacion?: number,
        public estadoCobranzaOperacion?: BaseEntity,
        public operacion?: BaseEntity,
    ) {
    }
}
