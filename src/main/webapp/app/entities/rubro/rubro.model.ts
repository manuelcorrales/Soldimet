export interface IRubro {
  id?: number;
  nombreRubro?: string;
}

export class Rubro implements IRubro {
  constructor(public id?: number, public nombreRubro?: string) {}
}

export function getRubroIdentifier(rubro: IRubro): number | undefined {
  return rubro.id;
}
