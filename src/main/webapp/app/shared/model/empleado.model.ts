import { IPersona } from 'app/shared/model/persona.model';

export interface IEmpleado {
    id?: number;
    usuario?: string;
    contrasenia?: string;
    persona?: IPersona;
}

export class Empleado implements IEmpleado {
    constructor(public id?: number, public usuario?: string, public contrasenia?: string, public persona?: IPersona) {}
}
