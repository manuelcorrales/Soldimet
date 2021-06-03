import { IArticulo } from 'app/shared/model/articulo.model';
import { IMovimiento } from 'app/shared/model/movimiento.model';
import { IMedidaArticulo } from 'app/shared/model/medida-articulo.model';

export interface IMovimientoArticulo {
  id?: number;
  cantidad?: number;
  articulo?: IArticulo;
  movimiento?: IMovimiento;
  medida?: IMedidaArticulo;
}

export class MovimientoArticulo implements IMovimientoArticulo {
  constructor(
    public id?: number,
    public cantidad?: number,
    public articulo?: IArticulo,
    public movimiento?: IMovimiento,
    public medida?: IMedidaArticulo
  ) {}
}
