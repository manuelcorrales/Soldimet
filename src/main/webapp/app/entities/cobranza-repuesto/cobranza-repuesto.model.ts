import { BaseEntity } from './../../shared';

export class CobranzaRepuesto implements BaseEntity {
    constructor(
        public id?: number,
        public valor?: number,
        public tipoRepuesto?: BaseEntity,
    ) {
    }
}
