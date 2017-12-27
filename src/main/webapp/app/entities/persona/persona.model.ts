import { BaseEntity } from './../../shared';

export class Persona implements BaseEntity {
    constructor(
        public id?: number,
        public nombre?: string,
        public numeroTelefono?: string,
        public direccion?: BaseEntity,
        public estadoPersona?: BaseEntity,
    ) {
    }
}
