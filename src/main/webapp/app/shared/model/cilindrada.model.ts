export interface ICilindrada {
  id?: number;
  cantidadDeCilindros?: number;
}

export class Cilindrada implements ICilindrada {
  constructor(public id?: number, public cantidadDeCilindros?: number) {}
}
