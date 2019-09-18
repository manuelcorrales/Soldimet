import { Moment } from 'moment';
import { IEstadoMovimiento } from 'app/shared/model/estado-movimiento.model';
import { ITipoMovimiento } from 'app/shared/model/tipo-movimiento.model';
import { IEmpleado } from 'app/shared/model/empleado.model';
import { ICaja } from 'app/shared/model/caja.model';
import { ISubCategoria } from 'app/shared/model/sub-categoria.model';
import { IMedioDePago } from 'app/shared/model/medio-de-pago.model';

export interface IMovimiento {
    id?: number;
    fecha?: Moment;
    importe?: number;
    descuento?: number;
    observaciones?: string;
    estado?: IEstadoMovimiento;
    tipoMovimiento?: ITipoMovimiento;
    empleado?: IEmpleado;
    caja?: ICaja;
    subCategoria?: ISubCategoria;
    medioDePago?: IMedioDePago;
}

export class Movimiento implements IMovimiento {
    constructor(
        public id?: number,
        public fecha?: Moment,
        public importe?: number,
        public descuento?: number,
        public observaciones?: string,
        public estado?: IEstadoMovimiento,
        public tipoMovimiento?: ITipoMovimiento,
        public empleado?: IEmpleado,
        public caja?: ICaja,
        public subCategoria?: ISubCategoria,
        public medioDePago?: IMedioDePago
    ) {}
}
