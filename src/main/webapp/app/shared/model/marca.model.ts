export interface IMarca {
  id?: number;
  nombreMarca?: string;
}

export class Marca implements IMarca {
  constructor(public id?: number, public nombreMarca?: string) {}
}
