import { IMotor } from 'app/shared/model/motor.model';

export interface IAplicacion {
  id?: number;
  nombreAplicacion?: string;
  numeroGrupo?: number;
  motor?: IMotor;
}

export class Aplicacion implements IAplicacion {
  constructor(public id?: number, public nombreAplicacion?: string, public numeroGrupo?: number, public motor?: IMotor) {}
}
