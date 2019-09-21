import { ILocalidad } from 'app/shared/model/localidad.model';

export interface IDireccion {
  id?: number;
  calle?: string;
  numero?: number;
  localidad?: ILocalidad;
}

export class Direccion implements IDireccion {
  constructor(public id?: number, public calle?: string, public numero?: number, public localidad?: ILocalidad) {}
}
