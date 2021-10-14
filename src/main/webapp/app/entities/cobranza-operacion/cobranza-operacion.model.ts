import { IEstadoCobranzaOperacion } from 'app/entities/estado-cobranza-operacion/estado-cobranza-operacion.model';
import { IOperacion } from 'app/entities/operacion/operacion.model';

export interface ICobranzaOperacion {
  id?: number;
  cobranzaOperacion?: number;
  estadoCobranzaOperacion?: IEstadoCobranzaOperacion;
  operacion?: IOperacion;
}

export class CobranzaOperacion implements ICobranzaOperacion {
  constructor(
    public id?: number,
    public cobranzaOperacion?: number,
    public estadoCobranzaOperacion?: IEstadoCobranzaOperacion,
    public operacion?: IOperacion
  ) {}
}

export function getCobranzaOperacionIdentifier(cobranzaOperacion: ICobranzaOperacion): number | undefined {
  return cobranzaOperacion.id;
}
