import { IPersona } from 'app/shared/model/persona.model';

export interface ICliente {
  id?: number;
  persona?: IPersona;
}

export class Cliente implements ICliente {
  constructor(public id?: number, public persona?: IPersona) {}
}
