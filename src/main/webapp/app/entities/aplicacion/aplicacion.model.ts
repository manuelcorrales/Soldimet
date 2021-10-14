import { IMotor } from 'app/entities/motor/motor.model';

export interface IAplicacion {
  id?: number;
  nombreAplicacion?: string;
  numeroGrupo?: number;
  motor?: IMotor;
}

export class Aplicacion implements IAplicacion {
  constructor(public id?: number, public nombreAplicacion?: string, public numeroGrupo?: number, public motor?: IMotor) {}
}

export function getAplicacionIdentifier(aplicacion: IAplicacion): number | undefined {
  return aplicacion.id;
}
