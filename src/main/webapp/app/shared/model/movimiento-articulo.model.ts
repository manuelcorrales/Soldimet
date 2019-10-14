import { IArticulo } from 'app/shared/model/articulo.model';
import { IMovimiento } from 'app/shared/model/movimiento.model';

export interface IMovimientoArticulo {
  id?: number;
  cantidad?: number;
  articulo?: IArticulo;
  movimiento?: IMovimiento;
}

export class MovimientoArticulo implements IMovimientoArticulo {
  constructor(public id?: number, public cantidad?: number, public articulo?: IArticulo, public movimiento?: IMovimiento) {}
}
