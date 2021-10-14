export interface ITipoParteMotor {
  id?: number;
  nombreTipoParteMotor?: string;
}

export class TipoParteMotor implements ITipoParteMotor {
  constructor(public id?: number, public nombreTipoParteMotor?: string) {}
}

export function getTipoParteMotorIdentifier(tipoParteMotor: ITipoParteMotor): number | undefined {
  return tipoParteMotor.id;
}
