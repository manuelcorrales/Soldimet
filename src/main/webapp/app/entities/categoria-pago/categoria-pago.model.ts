export interface ICategoriaPago {
  id?: number;
  nombreCategoriaPago?: string;
}

export class CategoriaPago implements ICategoriaPago {
  constructor(public id?: number, public nombreCategoriaPago?: string) {}
}

export function getCategoriaPagoIdentifier(categoriaPago: ICategoriaPago): number | undefined {
  return categoriaPago.id;
}
