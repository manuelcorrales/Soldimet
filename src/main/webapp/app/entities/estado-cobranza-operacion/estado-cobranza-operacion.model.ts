export interface IEstadoCobranzaOperacion {
  id?: number;
  nombreEstado?: string;
}

export class EstadoCobranzaOperacion implements IEstadoCobranzaOperacion {
  constructor(public id?: number, public nombreEstado?: string) {}
}

export function getEstadoCobranzaOperacionIdentifier(estadoCobranzaOperacion: IEstadoCobranzaOperacion): number | undefined {
  return estadoCobranzaOperacion.id;
}
