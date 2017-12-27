import { BaseEntity } from './../../shared';

export class FormaDePago implements BaseEntity {
    constructor(
        public id?: number,
        public nombreFormaDePago?: string,
    ) {
    }
}
