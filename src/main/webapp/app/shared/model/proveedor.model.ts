import { IPersona } from 'app/shared/model/persona.model';

export interface IProveedor {
    id?: number;
    persona?: IPersona;
}

export class Proveedor implements IProveedor {
    constructor(public id?: number, public persona?: IPersona) {}
}
