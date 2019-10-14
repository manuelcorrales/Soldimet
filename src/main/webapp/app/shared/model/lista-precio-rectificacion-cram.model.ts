import { Moment } from 'moment';
import { ICostoOperacion } from 'app/shared/model/costo-operacion.model';
import { IListaPrecioDesdeHasta } from 'app/shared/model/lista-precio-desde-hasta.model';

export interface IListaPrecioRectificacionCRAM {
  id?: number;
  fechaVigenciaDesde?: Moment;
  fechaVigenciaHasta?: Moment;
  numeroGrupo?: number;
  costoOperacion?: ICostoOperacion;
  fechas?: IListaPrecioDesdeHasta[];
}

export class ListaPrecioRectificacionCRAM implements IListaPrecioRectificacionCRAM {
  constructor(
    public id?: number,
    public fechaVigenciaDesde?: Moment,
    public fechaVigenciaHasta?: Moment,
    public numeroGrupo?: number,
    public costoOperacion?: ICostoOperacion,
    public fechas?: IListaPrecioDesdeHasta[]
  ) {}
}
