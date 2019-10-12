import { IPersona } from 'app/shared/model/persona.model';
import { ISucursal } from 'app/shared/model/sucursal.model';

export interface IEmpleado {
  id?: number;
  persona?: IPersona;
  sucursal?: ISucursal;
}

export class Empleado implements IEmpleado {
  constructor(public id?: number, public persona?: IPersona, public sucursal?: ISucursal) {}
}
