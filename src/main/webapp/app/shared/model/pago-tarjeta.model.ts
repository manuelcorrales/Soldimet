import { IFormaDePago } from 'app/shared/model/forma-de-pago.model';
import { ITarjeta } from 'app/shared/model/tarjeta.model';
import { ITipoTarjeta } from 'app/shared/model/tipo-tarjeta.model';

export interface IPagoTarjeta {
    id?: number;
    numeroTarjeta?: string;
    formaDePago?: IFormaDePago;
    tarjeta?: ITarjeta;
    tipoTarjeta?: ITipoTarjeta;
}

export class PagoTarjeta implements IPagoTarjeta {
    constructor(
        public id?: number,
        public numeroTarjeta?: string,
        public formaDePago?: IFormaDePago,
        public tarjeta?: ITarjeta,
        public tipoTarjeta?: ITipoTarjeta
    ) {}
}
