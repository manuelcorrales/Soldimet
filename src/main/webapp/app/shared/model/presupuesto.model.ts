import { Moment } from 'moment';
import { ICliente } from 'app/shared/model/cliente.model';
import { IEstadoPresupuesto } from 'app/shared/model/estado-presupuesto.model';
import { IDetallePresupuesto } from 'app/shared/model/detalle-presupuesto.model';
import { IDocumentationType } from 'app/shared/model//documentation-type.model';

export interface IPresupuesto {
    id?: number;
    descripcionDescuento?: string;
    descuento?: number;
    fechaCreacion?: Moment;
    fechaAceptado?: Moment;
    fechaEntregado?: Moment;
    importeTotal?: number;
    observaciones?: string;
    cliente?: ICliente;
    estadoPresupuesto?: IEstadoPresupuesto;
    detallePresupuestos?: IDetallePresupuesto[];
    documentType?: IDocumentationType;
}

export class Presupuesto implements IPresupuesto {
    constructor(
        public id?: number,
        public descripcionDescuento?: string,
        public descuento?: number,
        public fechaCreacion?: Moment,
        public fechaAceptado?: Moment,
        public fechaEntregado?: Moment,
        public importeTotal?: number,
        public observaciones?: string,
        public cliente?: ICliente,
        public estadoPresupuesto?: IEstadoPresupuesto,
        public detallePresupuestos?: IDetallePresupuesto[],
        public documentType?: IDocumentationType
    ) {}
}
