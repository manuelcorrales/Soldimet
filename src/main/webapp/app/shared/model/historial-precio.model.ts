import { Moment } from 'moment';
import { IPrecioRepuesto } from 'app/shared/model/precio-repuesto.model';

export interface IHistorialPrecio {
    id?: number;
    fechaHistorial?: Moment;
    precioRepuesto?: IPrecioRepuesto;
}

export class HistorialPrecio implements IHistorialPrecio {
    constructor(public id?: number, public fechaHistorial?: Moment, public precioRepuesto?: IPrecioRepuesto) {}
}
