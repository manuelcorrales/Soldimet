import { Moment } from 'moment';
import { IMovimiento } from 'app/shared/model/movimiento.model';

export interface ICaja {
    id?: number;
    fecha?: Moment;
    horaApertura?: Moment;
    horaCierre?: Moment;
    movimientos?: IMovimiento[];
}

export class Caja implements ICaja {
    constructor(
        public id?: number,
        public fecha?: Moment,
        public horaApertura?: Moment,
        public horaCierre?: Moment,
        public movimientos?: IMovimiento[]
    ) {}
}
