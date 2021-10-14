import { ITipoParteMotor } from 'app/entities/tipo-parte-motor/tipo-parte-motor.model';
import { IEstadoOperacion } from 'app/entities/estado-operacion/estado-operacion.model';

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

export function getOperacionIdentifier(operacion: IOperacion): number | undefined {
  return operacion.id;
}
