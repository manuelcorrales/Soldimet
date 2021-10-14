import { IArticulo } from 'app/entities/articulo/articulo.model';
import { IMovimiento } from 'app/entities/movimiento/movimiento.model';
import { IMedidaArticulo } from 'app/entities/medida-articulo/medida-articulo.model';

export interface IMovimientoArticulo {
  id?: number;
  cantidad?: number;
  articulo?: IArticulo;
  movimiento?: IMovimiento | null;
  medida?: IMedidaArticulo | null;
}

export class MovimientoArticulo implements IMovimientoArticulo {
  constructor(
    public id?: number,
    public cantidad?: number,
    public articulo?: IArticulo,
    public movimiento?: IMovimiento | null,
    public medida?: IMedidaArticulo | null
  ) {}
}

export function getMovimientoArticuloIdentifier(movimientoArticulo: IMovimientoArticulo): number | undefined {
  return movimientoArticulo.id;
}
