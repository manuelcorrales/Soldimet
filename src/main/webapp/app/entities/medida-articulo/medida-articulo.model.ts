export interface IMedidaArticulo {
  id?: number;
  medida?: string | null;
}

export class MedidaArticulo implements IMedidaArticulo {
  constructor(public id?: number, public medida?: string | null) {}
}

export function getMedidaArticuloIdentifier(medidaArticulo: IMedidaArticulo): number | undefined {
  return medidaArticulo.id;
}
