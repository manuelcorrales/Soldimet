import { BaseEntity } from './../../shared';

export class SubCategoria implements BaseEntity {
    constructor(
        public id?: number,
        public nombreSubCategoria?: string,
    ) {
    }
}
