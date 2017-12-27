import { BaseEntity } from './../../shared';

export class Empleado implements BaseEntity {
    constructor(
        public id?: number,
        public usuario?: string,
        public contrasenia?: string,
        public persona?: BaseEntity,
    ) {
    }
}
