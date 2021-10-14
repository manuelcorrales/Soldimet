import { ITipoParteMotor } from 'app/entities/tipo-parte-motor/tipo-parte-motor.model';

export interface ITipoRepuesto {
  id?: number;
  nombreTipoRepuesto?: string;
  tipoParteMotor?: ITipoParteMotor;
}

export class TipoRepuesto implements ITipoRepuesto {
  constructor(public id?: number, public nombreTipoRepuesto?: string, public tipoParteMotor?: ITipoParteMotor) {}
}

export function getTipoRepuestoIdentifier(tipoRepuesto: ITipoRepuesto): number | undefined {
  return tipoRepuesto.id;
}
