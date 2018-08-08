import { IPresupuesto } from 'app/shared/model/presupuesto.model';
import { IMovimiento } from 'app/shared/model/movimiento.model';

export interface IMovimientoPresupuesto {
    id?: number;
    presupuesto?: IPresupuesto;
    movimiento?: IMovimiento;
}

export class MovimientoPresupuesto implements IMovimientoPresupuesto {
    constructor(public id?: number, public presupuesto?: IPresupuesto, public movimiento?: IMovimiento) {}
}
