import { IDireccion } from 'app/entities/direccion/direccion.model';
import { IEstadoPersona } from 'app/entities/estado-persona/estado-persona.model';
import { IUser } from 'app/entities/user/user.model';

export interface IPersona {
  id?: number;
  numeroTelefono?: string | null;
  nombre?: string;
  apellido?: string | null;
  direccion?: IDireccion | null;
  estadoPersona?: IEstadoPersona | null;
  user?: IUser | null;
}

export class Persona implements IPersona {
  constructor(
    public id?: number,
    public numeroTelefono?: string | null,
    public nombre?: string,
    public apellido?: string | null,
    public direccion?: IDireccion | null,
    public estadoPersona?: IEstadoPersona | null,
    public user?: IUser | null
  ) {}
}

export function getPersonaIdentifier(persona: IPersona): number | undefined {
  return persona.id;
}
