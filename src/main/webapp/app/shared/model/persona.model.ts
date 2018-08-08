import { IDireccion } from 'app/shared/model/direccion.model';
import { IEstadoPersona } from 'app/shared/model/estado-persona.model';
import { IUser } from 'app/core/user/user.model';

export interface IPersona {
    id?: number;
    nombre?: string;
    numeroTelefono?: string;
    direccion?: IDireccion;
    estadoPersona?: IEstadoPersona;
    user?: IUser;
}

export class Persona implements IPersona {
    constructor(
        public id?: number,
        public nombre?: string,
        public numeroTelefono?: string,
        public direccion?: IDireccion,
        public estadoPersona?: IEstadoPersona,
        public user?: IUser
    ) {}
}
