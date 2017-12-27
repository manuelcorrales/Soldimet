import { BaseEntity } from './../../shared';

export class TipoParteMotor implements BaseEntity {
    constructor(
        public id?: number,
        public nombreTipoParteMotor?: string,
    ) {
    }
}
