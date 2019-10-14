import { Moment } from 'moment';

export interface IPrecioRepuesto {
  id?: number;
  fecha?: Moment;
  precioPrivado?: number;
  precioPublico?: number;
}

export class PrecioRepuesto implements IPrecioRepuesto {
  constructor(public id?: number, public fecha?: Moment, public precioPrivado?: number, public precioPublico?: number) {}
}
