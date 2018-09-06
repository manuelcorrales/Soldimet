import { CostoOperacion } from 'app/shared/model/costo-operacion.model';

export class DTOListaPrecioManoDeObraComponent {
    constructor(public numeroLista?: number, public fechaDesde?: any, public fechaHasta?: any, public operaciones?: CostoOperacion[]) {}
}
