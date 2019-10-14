import { IAplicacion } from 'app/shared/model/aplicacion.model';

export interface IMotor {
  id?: number;
  marcaMotor?: string;
  aplicacions?: IAplicacion[];
}

export class Motor implements IMotor {
  constructor(public id?: number, public marcaMotor?: string, public aplicacions?: IAplicacion[]) {}
}
