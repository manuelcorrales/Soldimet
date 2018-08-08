import { IDetallePresupuesto } from 'app/shared/model/detalle-presupuesto.model';
import { ICostoRepuesto } from 'app/shared/model/costo-repuesto.model';

export interface IDetallePedido {
    id?: number;
    detallePresupuesto?: IDetallePresupuesto;
    costoRepuestos?: ICostoRepuesto[];
}

export class DetallePedido implements IDetallePedido {
    constructor(public id?: number, public detallePresupuesto?: IDetallePresupuesto, public costoRepuestos?: ICostoRepuesto[]) {}
}
