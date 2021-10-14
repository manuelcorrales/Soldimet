export interface ILocalidad {
  id?: number;
  nombreLocalidad?: string;
}

export class Localidad implements ILocalidad {
  constructor(public id?: number, public nombreLocalidad?: string) {}
}

export function getLocalidadIdentifier(localidad: ILocalidad): number | undefined {
  return localidad.id;
}
