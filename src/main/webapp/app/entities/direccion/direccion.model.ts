import { BaseEntity } from './../../shared';

export class Direccion implements BaseEntity {
    constructor(
        public id?: number,
        public calle?: string,
        public numero?: number,
        public localidad?: BaseEntity,
    ) {
    }
}
