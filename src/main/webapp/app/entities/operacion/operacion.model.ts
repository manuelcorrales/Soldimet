import { BaseEntity } from './../../shared';

export class Operacion implements BaseEntity {
    constructor(
        public id?: number,
        public nombreOperacion?: string,
        public tipoParteMotor?: BaseEntity,
        public estadoOperacion?: BaseEntity,
    ) {
    }
}
