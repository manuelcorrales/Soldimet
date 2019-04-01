import { Moment } from 'moment';
import { IEstadoMovimiento } from 'app/shared/model/estado-movimiento.model';
import { ITipoMovimiento } from 'app/shared/model/tipo-movimiento.model';
import { IEmpleado } from 'app/shared/model/empleado.model';
import { IPersona } from 'app/shared/model/persona.model';
import { ICaja } from 'app/shared/model/caja.model';
import { ISubCategoria } from 'app/shared/model/sub-categoria.model';
import { IMedioDePago } from 'app/shared/model//medio-de-pago.model';
import { IDetalleMovimiento } from 'app/shared/model/detalle-movimiento.model';

export interface IMovimiento {
    id?: number;
    fecha?: Moment;
    hora?: Moment;
    importe?: number;
    descuento?: number;
    observaciones?: string;
    estado?: IEstadoMovimiento;
    tipoMovimiento?: ITipoMovimiento;
    empleado?: IEmpleado;
    persona?: IPersona;
    caja?: ICaja;
    subCategoria?: ISubCategoria;
    medioDePago?: IMedioDePago;
    detalleMovimientos?: IDetalleMovimiento[];
}

export class Movimiento implements IMovimiento {
    constructor(
        public id?: number,
        public fecha?: Moment,
        public hora?: Moment,
        public importe?: number,
        public descuento?: number,
        public observaciones?: string,
        public estado?: IEstadoMovimiento,
        public tipoMovimiento?: ITipoMovimiento,
        public empleado?: IEmpleado,
        public persona?: IPersona,
        public caja?: ICaja,
        public subCategoria?: ISubCategoria,
        public medioDePago?: IMedioDePago,
        public detalleMovimientos?: IDetalleMovimiento[]
    ) {}
}
