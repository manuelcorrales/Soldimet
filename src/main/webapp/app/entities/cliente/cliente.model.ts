import { BaseEntity } from './../../shared';

export class Cliente implements BaseEntity {
    constructor(
        public id?: number,
        public apellido?: string,
        public persona?: BaseEntity,
    ) {
    }
}
