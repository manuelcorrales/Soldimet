import { ILocalidad } from 'app/entities/localidad/localidad.model';

export interface IDireccion {
  id?: number;
  calle?: string;
  numero?: number;
  localidad?: ILocalidad;
}

export class Direccion implements IDireccion {
  constructor(public id?: number, public calle?: string, public numero?: number, public localidad?: ILocalidad) {}
}

export function getDireccionIdentifier(direccion: IDireccion): number | undefined {
  return direccion.id;
}
