export interface IBanco {
  id?: number;
  nombreBanco?: string;
}

export class Banco implements IBanco {
  constructor(public id?: number, public nombreBanco?: string) {}
}
