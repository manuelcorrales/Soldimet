import * as dayjs from 'dayjs';

export interface IListaPrecioDesdeHasta {
  id?: number;
  fechaDesde?: dayjs.Dayjs;
  fechaHasta?: dayjs.Dayjs | null;
}

export class ListaPrecioDesdeHasta implements IListaPrecioDesdeHasta {
  constructor(public id?: number, public fechaDesde?: dayjs.Dayjs, public fechaHasta?: dayjs.Dayjs | null) {}
}

export function getListaPrecioDesdeHastaIdentifier(listaPrecioDesdeHasta: IListaPrecioDesdeHasta): number | undefined {
  return listaPrecioDesdeHasta.id;
}
