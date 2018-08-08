import { ITipoDetalleMovimiento } from 'app/shared/model/tipo-detalle-movimiento.model';
import { IPresupuesto } from 'app/shared/model/presupuesto.model';

export interface IDetalleMovimiento {
    id?: number;
    tipoDetalleMovimiento?: ITipoDetalleMovimiento;
    presupuesto?: IPresupuesto;
}

export class DetalleMovimiento implements IDetalleMovimiento {
    constructor(public id?: number, public tipoDetalleMovimiento?: ITipoDetalleMovimiento, public presupuesto?: IPresupuesto) {}
}
