import { IAplicacion } from 'app/entities/aplicacion/aplicacion.model';

export interface IMotor {
  id?: number;
  marcaMotor?: string;
  aplicacions?: IAplicacion[] | null;
}

export class Motor implements IMotor {
  constructor(public id?: number, public marcaMotor?: string, public aplicacions?: IAplicacion[] | null) {}
}

export function getMotorIdentifier(motor: IMotor): number | undefined {
  return motor.id;
}
