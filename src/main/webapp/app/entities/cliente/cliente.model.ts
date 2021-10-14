import { IPersona } from 'app/entities/persona/persona.model';

export interface ICliente {
  id?: number;
  persona?: IPersona;
}

export class Cliente implements ICliente {
  constructor(public id?: number, public persona?: IPersona) {}
}

export function getClienteIdentifier(cliente: ICliente): number | undefined {
  return cliente.id;
}
