import { BaseEntity } from './../../shared';

export class Cilindrada implements BaseEntity {
    constructor(
        public id?: number,
        public cantidadDeCilindros?: number,
    ) {
    }
}
