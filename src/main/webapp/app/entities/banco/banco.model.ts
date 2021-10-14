export interface IBanco {
  id?: number;
  nombreBanco?: string;
}

export class Banco implements IBanco {
  constructor(public id?: number, public nombreBanco?: string) {}
}

export function getBancoIdentifier(banco: IBanco): number | undefined {
  return banco.id;
}
