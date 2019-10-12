import { IPersona } from 'app/shared/model/persona.model';

export interface IProveedor {
  id?: number;
  nombreProveedor?: string;
  persona?: IPersona;
}

export class Proveedor implements IProveedor {
  constructor(public id?: number, public nombreProveedor?: string, public persona?: IPersona) {}
}
