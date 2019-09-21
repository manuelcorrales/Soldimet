import { ITipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';

export interface ITipoRepuesto {
  id?: number;
  nombreTipoRepuesto?: string;
  tipoParteMotor?: ITipoParteMotor;
}

export class TipoRepuesto implements ITipoRepuesto {
  constructor(public id?: number, public nombreTipoRepuesto?: string, public tipoParteMotor?: ITipoParteMotor) {}
}
