export interface IFormaDePago {
  id?: number;
  nombreFormaDePago?: string;
}

export class FormaDePago implements IFormaDePago {
  constructor(public id?: number, public nombreFormaDePago?: string) {}
}
