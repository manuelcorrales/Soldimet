import { IDireccion } from 'app/shared/model/direccion.model';
import { IEstadoPersona } from 'app/shared/model/estado-persona.model';
import { IUser } from 'app/core/user/user.model';

export interface IPersona {
  id?: number;
  numeroTelefono?: string;
  nombre?: string;
  apellido?: string;
  direccion?: IDireccion;
  estadoPersona?: IEstadoPersona;
  user?: IUser;
}

export class Persona implements IPersona {
  constructor(
    public id?: number,
    public numeroTelefono?: string,
    public nombre?: string,
    public apellido?: string,
    public direccion?: IDireccion,
    public estadoPersona?: IEstadoPersona,
    public user?: IUser
  ) {}
}
