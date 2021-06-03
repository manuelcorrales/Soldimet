export interface IMedidaArticulo {
  id?: number;
  medida?: string;
}

export class MedidaArticulo implements IMedidaArticulo {
  constructor(public id?: number, public medida?: string) {}
}
