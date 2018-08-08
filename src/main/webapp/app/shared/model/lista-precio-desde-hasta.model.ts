import { Moment } from 'moment';
import { ICostoOperacion } from 'app/shared/model/costo-operacion.model';

export interface IListaPrecioDesdeHasta {
    id?: number;
    fechaDesde?: Moment;
    fechaHasta?: Moment;
    costoOperacions?: ICostoOperacion[];
}

export class ListaPrecioDesdeHasta implements IListaPrecioDesdeHasta {
    constructor(public id?: number, public fechaDesde?: Moment, public fechaHasta?: Moment, public costoOperacions?: ICostoOperacion[]) {}
}
