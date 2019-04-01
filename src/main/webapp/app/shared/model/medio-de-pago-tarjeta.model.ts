import { ITarjeta } from 'app/shared/model/tarjeta.model';
import { ITipoTarjeta } from 'app/shared/model/tipo-tarjeta.model';

export interface IMedioDePagoTarjeta {
    id?: number;
    ultimos4?: string;
    tarjeta?: ITarjeta;
    tipoTarjeta?: ITipoTarjeta;
}

export class MedioDePagoTarjeta implements IMedioDePagoTarjeta {
    constructor(public id?: number, public ultimos4?: string, public tarjeta?: ITarjeta, public tipoTarjeta?: ITipoTarjeta) {}
}
