import * as dayjs from 'dayjs';
import { ISucursal } from 'app/entities/sucursal/sucursal.model';

export interface ICaja {
  id?: number;
  fecha?: dayjs.Dayjs;
  horaApertura?: dayjs.Dayjs;
  horaCierre?: dayjs.Dayjs | null;
  saldo?: number | null;
  observaciones?: string | null;
  saldoFisico?: number | null;
  sucursal?: ISucursal | null;
}

export class Caja implements ICaja {
  constructor(
    public id?: number,
    public fecha?: dayjs.Dayjs,
    public horaApertura?: dayjs.Dayjs,
    public horaCierre?: dayjs.Dayjs | null,
    public saldo?: number | null,
    public observaciones?: string | null,
    public saldoFisico?: number | null,
    public sucursal?: ISucursal | null
  ) {}
}

export function getCajaIdentifier(caja: ICaja): number | undefined {
  return caja.id;
}
