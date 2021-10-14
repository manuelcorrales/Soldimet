import { IMedidaArticulo } from 'app/entities/medida-articulo/medida-articulo.model';
import { IArticulo } from 'app/entities/articulo/articulo.model';
import { ISucursal } from 'app/entities/sucursal/sucursal.model';

export interface IStockArticulo {
  id?: number;
  cantidad?: number;
  medida?: IMedidaArticulo;
  articulo?: IArticulo;
  sucursal?: ISucursal;
}

export class StockArticulo implements IStockArticulo {
  constructor(
    public id?: number,
    public cantidad?: number,
    public medida?: IMedidaArticulo,
    public articulo?: IArticulo,
    public sucursal?: ISucursal
  ) {}
}

export function getStockArticuloIdentifier(stockArticulo: IStockArticulo): number | undefined {
  return stockArticulo.id;
}
