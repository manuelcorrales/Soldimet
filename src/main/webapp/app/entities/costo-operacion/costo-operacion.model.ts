import { ICilindrada } from 'app/entities/cilindrada/cilindrada.model';
import { IOperacion } from 'app/entities/operacion/operacion.model';
import { ITipoParteMotor } from 'app/entities/tipo-parte-motor/tipo-parte-motor.model';

export interface ICostoOperacion {
  id?: number;
  costoOperacion?: number;
  cilindrada?: ICilindrada;
  operacion?: IOperacion;
  tipoParteMotor?: ITipoParteMotor;
}

export class CostoOperacion implements ICostoOperacion {
  constructor(
    public id?: number,
    public costoOperacion?: number,
    public cilindrada?: ICilindrada,
    public operacion?: IOperacion,
    public tipoParteMotor?: ITipoParteMotor
  ) {}
}

export function getCostoOperacionIdentifier(costoOperacion: ICostoOperacion): number | undefined {
  return costoOperacion.id;
}
