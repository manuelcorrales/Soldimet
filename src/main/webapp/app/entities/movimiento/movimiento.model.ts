import * as dayjs from 'dayjs';
import { IMedioDePago } from 'app/entities/medio-de-pago/medio-de-pago.model';
import { IEstadoMovimiento } from 'app/entities/estado-movimiento/estado-movimiento.model';
import { ITipoMovimiento } from 'app/entities/tipo-movimiento/tipo-movimiento.model';
import { IEmpleado } from 'app/entities/empleado/empleado.model';
import { ICaja } from 'app/entities/caja/caja.model';
import { ISubCategoria } from 'app/entities/sub-categoria/sub-categoria.model';

export interface IMovimiento {
  id?: number;
  fecha?: dayjs.Dayjs;
  importe?: number;
  descuento?: number | null;
  observaciones?: string | null;
  medioDePago?: IMedioDePago | null;
  estado?: IEstadoMovimiento;
  tipoMovimiento?: ITipoMovimiento;
  empleado?: IEmpleado;
  caja?: ICaja | null;
  subCategoria?: ISubCategoria | null;
}

export class Movimiento implements IMovimiento {
  constructor(
    public id?: number,
    public fecha?: dayjs.Dayjs,
    public importe?: number,
    public descuento?: number | null,
    public observaciones?: string | null,
    public medioDePago?: IMedioDePago | null,
    public estado?: IEstadoMovimiento,
    public tipoMovimiento?: ITipoMovimiento,
    public empleado?: IEmpleado,
    public caja?: ICaja | null,
    public subCategoria?: ISubCategoria | null
  ) {}
}

export function getMovimientoIdentifier(movimiento: IMovimiento): number | undefined {
  return movimiento.id;
}
