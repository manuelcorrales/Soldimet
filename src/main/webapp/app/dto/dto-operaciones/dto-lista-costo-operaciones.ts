import { CostoOperacion } from 'app/shared/model/costo-operacion.model';

export class DTOListaPrecioManoDeObra {
    constructor(public numeroLista?: number, public fechaDesde?: any, public fechaHasta?: any, public operaciones?: CostoOperacion[]) {}
}
