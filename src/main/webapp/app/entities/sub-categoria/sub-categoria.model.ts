export interface ISubCategoria {
  id?: number;
  nombreSubCategoria?: string;
}

export class SubCategoria implements ISubCategoria {
  constructor(public id?: number, public nombreSubCategoria?: string) {}
}

export function getSubCategoriaIdentifier(subCategoria: ISubCategoria): number | undefined {
  return subCategoria.id;
}
