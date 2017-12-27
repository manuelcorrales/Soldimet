import { BaseEntity } from './../../shared';

export class CostoOperacion implements BaseEntity {
    constructor(
        public id?: number,
        public costoOperacion?: number,
        public cilindrada?: BaseEntity,
        public operacion?: BaseEntity,
        public tipoParteMotor?: BaseEntity,
    ) {
    }
}
