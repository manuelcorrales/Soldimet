export interface IMarca {
  id?: number;
  nombreMarca?: string;
}

export class Marca implements IMarca {
  constructor(public id?: number, public nombreMarca?: string) {}
}

export function getMarcaIdentifier(marca: IMarca): number | undefined {
  return marca.id;
}
