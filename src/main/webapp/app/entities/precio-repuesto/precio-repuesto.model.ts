import * as dayjs from 'dayjs';

export interface IPrecioRepuesto {
  id?: number;
  fecha?: dayjs.Dayjs;
  precioPrivado?: number | null;
  precioPublico?: number;
}

export class PrecioRepuesto implements IPrecioRepuesto {
  constructor(public id?: number, public fecha?: dayjs.Dayjs, public precioPrivado?: number | null, public precioPublico?: number) {}
}

export function getPrecioRepuestoIdentifier(precioRepuesto: IPrecioRepuesto): number | undefined {
  return precioRepuesto.id;
}
