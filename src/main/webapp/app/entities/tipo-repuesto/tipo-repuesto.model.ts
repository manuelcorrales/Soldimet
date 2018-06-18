import { BaseEntity } from './../../shared';

export class TipoRepuesto implements BaseEntity {
    constructor(
        public id?: number,
        public nombreTipoRepuesto?: string,
        public tipoParteMotor?: BaseEntity,
    ) {
    }
}
