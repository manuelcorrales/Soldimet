import { ITipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';
import { IEstadoOperacion } from 'app/shared/model/estado-operacion.model';

export interface IOperacion {
  id?: number;
  nombreOperacion?: string;
  tipoParteMotor?: ITipoParteMotor;
  estadoOperacion?: IEstadoOperacion;
}

export class Operacion implements IOperacion {
  constructor(
    public id?: number,
    public nombreOperacion?: string,
    public tipoParteMotor?: ITipoParteMotor,
    public estadoOperacion?: IEstadoOperacion
  ) {}
}
