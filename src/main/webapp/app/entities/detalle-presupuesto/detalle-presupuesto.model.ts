import { IAplicacion } from 'app/entities/aplicacion/aplicacion.model';
import { ICilindrada } from 'app/entities/cilindrada/cilindrada.model';
import { IMotor } from 'app/entities/motor/motor.model';
import { ITipoParteMotor } from 'app/entities/tipo-parte-motor/tipo-parte-motor.model';

export interface IDetallePresupuesto {
  id?: number;
  importe?: number;
  aplicacion?: IAplicacion;
  cilindrada?: ICilindrada;
  motor?: IMotor;
  tipoParteMotor?: ITipoParteMotor;
}

export class DetallePresupuesto implements IDetallePresupuesto {
  constructor(
    public id?: number,
    public importe?: number,
    public aplicacion?: IAplicacion,
    public cilindrada?: ICilindrada,
    public motor?: IMotor,
    public tipoParteMotor?: ITipoParteMotor
  ) {}
}

export function getDetallePresupuestoIdentifier(detallePresupuesto: IDetallePresupuesto): number | undefined {
  return detallePresupuesto.id;
}
