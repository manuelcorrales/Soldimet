import { BaseEntity } from './../../shared';

export class Motor implements BaseEntity {
    constructor(
        public id?: number,
        public aplicacions?: BaseEntity[],
    ) {
    }
}
