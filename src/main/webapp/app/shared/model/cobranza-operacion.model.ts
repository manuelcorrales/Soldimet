import { IEstadoCobranzaOperacion } from 'app/shared/model/estado-cobranza-operacion.model';
import { IOperacion } from 'app/shared/model/operacion.model';

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
