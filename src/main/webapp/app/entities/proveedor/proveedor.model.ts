import { IPersona } from 'app/entities/persona/persona.model';

export interface IProveedor {
  id?: number;
  nombreProveedor?: string;
  persona?: IPersona;
}

export class Proveedor implements IProveedor {
  constructor(public id?: number, public nombreProveedor?: string, public persona?: IPersona) {}
}

export function getProveedorIdentifier(proveedor: IProveedor): number | undefined {
  return proveedor.id;
}
