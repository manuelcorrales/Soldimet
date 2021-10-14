import { IMovimiento } from 'app/entities/movimiento/movimiento.model';
import { IPresupuesto } from 'app/entities/presupuesto/presupuesto.model';

export interface IMovimientoPresupuesto {
  id?: number;
  movimiento?: IMovimiento;
  presupuesto?: IPresupuesto;
}

export class MovimientoPresupuesto implements IMovimientoPresupuesto {
  constructor(public id?: number, public movimiento?: IMovimiento, public presupuesto?: IPresupuesto) {}
}

export function getMovimientoPresupuestoIdentifier(movimientoPresupuesto: IMovimientoPresupuesto): number | undefined {
  return movimientoPresupuesto.id;
}
