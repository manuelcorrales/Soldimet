export interface ISucursal {
  id?: number;
  nombreSucursal?: string;
}

export class Sucursal implements ISucursal {
  constructor(public id?: number, public nombreSucursal?: string) {}
}
