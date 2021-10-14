export interface ISucursal {
  id?: number;
  nombreSucursal?: string;
}

export class Sucursal implements ISucursal {
  constructor(public id?: number, public nombreSucursal?: string) {}
}

export function getSucursalIdentifier(sucursal: ISucursal): number | undefined {
  return sucursal.id;
}
