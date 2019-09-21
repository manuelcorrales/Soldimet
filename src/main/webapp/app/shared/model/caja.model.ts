import { Moment } from 'moment';
import { ISucursal } from 'app/shared/model/sucursal.model';

export interface ICaja {
  id?: number;
  fecha?: Moment;
  horaApertura?: Moment;
  horaCierre?: Moment;
  saldo?: number;
  observaciones?: string;
  saldoFisico?: number;
  sucursal?: ISucursal;
}

export class Caja implements ICaja {
  constructor(
    public id?: number,
    public fecha?: Moment,
    public horaApertura?: Moment,
    public horaCierre?: Moment,
    public saldo?: number,
    public observaciones?: string,
    public saldoFisico?: number,
    public sucursal?: ISucursal
  ) {}
}
