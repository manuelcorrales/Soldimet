import { IPresupuesto } from 'app/shared/model/presupuesto.model';
import { IMovimiento } from 'app/shared/model/movimiento.model';
import { ICostoRepuesto } from 'app/shared/model/costo-repuesto.model';

export interface IMovimientoPresupuesto {
    id?: number;
    presupuesto?: IPresupuesto;
    movimiento?: IMovimiento;
    costoRepuestos?: ICostoRepuesto[];
}

export class MovimientoPresupuesto implements IMovimientoPresupuesto {
    constructor(
        public id?: number,
        public presupuesto?: IPresupuesto,
        public movimiento?: IMovimiento,
        public costoRepuestos?: ICostoRepuesto[]
    ) {}
}
