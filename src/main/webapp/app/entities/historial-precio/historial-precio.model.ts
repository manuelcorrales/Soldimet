import * as dayjs from 'dayjs';
import { IPrecioRepuesto } from 'app/entities/precio-repuesto/precio-repuesto.model';

export interface IHistorialPrecio {
  id?: number;
  fechaHistorial?: dayjs.Dayjs;
  precioRepuesto?: IPrecioRepuesto;
}

export class HistorialPrecio implements IHistorialPrecio {
  constructor(public id?: number, public fechaHistorial?: dayjs.Dayjs, public precioRepuesto?: IPrecioRepuesto) {}
}

export function getHistorialPrecioIdentifier(historialPrecio: IHistorialPrecio): number | undefined {
  return historialPrecio.id;
}
