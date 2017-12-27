import { BaseEntity } from './../../shared';

export class Caja implements BaseEntity {
    constructor(
        public id?: number,
        public fecha?: any,
        public horaApertura?: any,
        public horaCierre?: any,
        public movimientos?: BaseEntity[],
    ) {
    }
}
