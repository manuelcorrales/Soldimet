import { BaseEntity } from './../../shared';

export class Aplicacion implements BaseEntity {
    constructor(
        public id?: number,
        public nombreAplicacion?: string,
        public numeroGrupo?: number,
    ) {
    }
}
