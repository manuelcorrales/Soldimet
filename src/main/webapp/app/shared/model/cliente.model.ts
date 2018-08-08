import { IPersona } from 'app/shared/model/persona.model';

export interface ICliente {
    id?: number;
    apellido?: string;
    persona?: IPersona;
}

export class Cliente implements ICliente {
    constructor(public id?: number, public apellido?: string, public persona?: IPersona) {}
}
