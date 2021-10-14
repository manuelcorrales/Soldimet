import { IPersona } from 'app/entities/persona/persona.model';
import { ISucursal } from 'app/entities/sucursal/sucursal.model';

export interface IEmpleado {
  id?: number;
  persona?: IPersona;
  sucursal?: ISucursal | null;
}

export class Empleado implements IEmpleado {
  constructor(public id?: number, public persona?: IPersona, public sucursal?: ISucursal | null) {}
}

export function getEmpleadoIdentifier(empleado: IEmpleado): number | undefined {
  return empleado.id;
}
