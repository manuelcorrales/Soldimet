import { Moment } from 'moment';
import { IEstadoMovimiento } from 'app/shared/model/estado-movimiento.model';
import { IFormaDePago } from 'app/shared/model/forma-de-pago.model';
import { ITipoMovimiento } from 'app/shared/model/tipo-movimiento.model';
import { IDetalleMovimiento } from 'app/shared/model/detalle-movimiento.model';
import { IEmpleado } from 'app/shared/model/empleado.model';
import { IPersona } from 'app/shared/model/persona.model';
import { ISubCategoria } from 'app/shared/model/sub-categoria.model';

export interface IMovimiento {
    id?: number;
    fecha?: Moment;
    hora?: Moment;
    importe?: number;
    estado?: IEstadoMovimiento;
    formaDePago?: IFormaDePago;
    tipoMovimiento?: ITipoMovimiento;
    detalleMovimientos?: IDetalleMovimiento[];
    empleado?: IEmpleado;
    persona?: IPersona;
    subCategoria?: ISubCategoria;
}

export class Movimiento implements IMovimiento {
    constructor(
        public id?: number,
        public fecha?: Moment,
        public hora?: Moment,
        public importe?: number,
        public estado?: IEstadoMovimiento,
        public formaDePago?: IFormaDePago,
        public tipoMovimiento?: ITipoMovimiento,
        public detalleMovimientos?: IDetalleMovimiento[],
        public empleado?: IEmpleado,
        public persona?: IPersona,
        public subCategoria?: ISubCategoria
    ) {}
}
