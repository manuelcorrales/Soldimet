import { IListaPrecioDesdeHasta } from 'app/shared/model/lista-precio-desde-hasta.model';

export interface IListaPrecioRectificacionCRAM {
  id?: number;
  numeroGrupo?: number;
  fechas?: IListaPrecioDesdeHasta[];
}

export class ListaPrecioRectificacionCRAM implements IListaPrecioRectificacionCRAM {
  constructor(public id?: number, public numeroGrupo?: number, public fechas?: IListaPrecioDesdeHasta[]) {}
}
