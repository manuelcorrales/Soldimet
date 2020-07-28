import { Moment } from 'moment';
import { ICliente } from 'app/shared/model/cliente.model';
import { IEstadoPresupuesto } from 'app/shared/model/estado-presupuesto.model';
import { IDetallePresupuesto } from 'app/shared/model/detalle-presupuesto.model';
import { IDocumentationType } from 'app/shared/model/documentation-type.model';
import { ISucursal } from 'app/shared/model/sucursal.model';

export interface IPresupuesto {
  id?: number;
  descripcionDescuento?: string;
  descuento?: number;
  fechaCreacion?: Moment;
  fechaAceptado?: Moment;
  fechaEntregado?: Moment;
  importeTotal?: number;
  observaciones?: string;
  soldadura?: boolean;
  modelo?: boolean;
  cliente?: ICliente;
  estadoPresupuesto?: IEstadoPresupuesto;
  detallePresupuestos?: IDetallePresupuesto[];
  documentType?: IDocumentationType;
  sucursal?: ISucursal;
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
    public soldadura?: boolean,
    public modelo?: boolean,
    public cliente?: ICliente,
    public estadoPresupuesto?: IEstadoPresupuesto,
    public detallePresupuestos?: IDetallePresupuesto[],
    public documentType?: IDocumentationType,
    public sucursal?: ISucursal
  ) {
    this.soldadura = this.soldadura || false;
    this.modelo = this.modelo || false;
  }
}
