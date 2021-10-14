export interface IEstadoArticulo {
  id?: number;
  nombreEstado?: string;
}

export class EstadoArticulo implements IEstadoArticulo {
  constructor(public id?: number, public nombreEstado?: string) {}
}

export function getEstadoArticuloIdentifier(estadoArticulo: IEstadoArticulo): number | undefined {
  return estadoArticulo.id;
}
