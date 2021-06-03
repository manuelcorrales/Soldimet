import { IMedidaArticulo } from 'app/shared/model/medida-articulo.model';
import { IArticulo } from 'app/shared/model/articulo.model';
import { ISucursal } from 'app/shared/model/sucursal.model';

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
