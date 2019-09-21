import { IPersona } from 'app/shared/model/persona.model';
import { ISucursal } from 'app/shared/model/sucursal.model';

export interface IEmpleado {
  id?: number;
  usuario?: string;
  contrasenia?: string;
  persona?: IPersona;
  sucursal?: ISucursal;
}

export class Empleado implements IEmpleado {
  constructor(
    public id?: number,
    public usuario?: string,
    public contrasenia?: string,
    public persona?: IPersona,
    public sucursal?: ISucursal
  ) {}
}
