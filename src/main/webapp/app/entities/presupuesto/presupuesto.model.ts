import * as dayjs from 'dayjs';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { IEstadoPresupuesto } from 'app/entities/estado-presupuesto/estado-presupuesto.model';
import { IDocumentationType } from 'app/entities/documentation-type/documentation-type.model';
import { ISucursal } from 'app/entities/sucursal/sucursal.model';

export interface IPresupuesto {
  id?: number;
  descripcionDescuento?: string | null;
  descuento?: number | null;
  fechaCreacion?: dayjs.Dayjs | null;
  fechaAceptado?: dayjs.Dayjs | null;
  fechaEntregado?: dayjs.Dayjs | null;
  importeTotal?: number;
  observaciones?: string | null;
  soldadura?: boolean | null;
  modelo?: boolean | null;
  cliente?: ICliente;
  estadoPresupuesto?: IEstadoPresupuesto;
  documentType?: IDocumentationType | null;
  sucursal?: ISucursal | null;
}

export class Presupuesto implements IPresupuesto {
  constructor(
    public id?: number,
    public descripcionDescuento?: string | null,
    public descuento?: number | null,
    public fechaCreacion?: dayjs.Dayjs | null,
    public fechaAceptado?: dayjs.Dayjs | null,
    public fechaEntregado?: dayjs.Dayjs | null,
    public importeTotal?: number,
    public observaciones?: string | null,
    public soldadura?: boolean | null,
    public modelo?: boolean | null,
    public cliente?: ICliente,
    public estadoPresupuesto?: IEstadoPresupuesto,
    public documentType?: IDocumentationType | null,
    public sucursal?: ISucursal | null
  ) {
    this.soldadura = this.soldadura ?? false;
    this.modelo = this.modelo ?? false;
  }
}

export function getPresupuestoIdentifier(presupuesto: IPresupuesto): number | undefined {
  return presupuesto.id;
}
