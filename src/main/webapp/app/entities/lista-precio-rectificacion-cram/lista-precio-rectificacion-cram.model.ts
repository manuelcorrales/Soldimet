export interface IListaPrecioRectificacionCRAM {
  id?: number;
  numeroGrupo?: number;
}

export class ListaPrecioRectificacionCRAM implements IListaPrecioRectificacionCRAM {
  constructor(public id?: number, public numeroGrupo?: number) {}
}

export function getListaPrecioRectificacionCRAMIdentifier(listaPrecioRectificacionCRAM: IListaPrecioRectificacionCRAM): number | undefined {
  return listaPrecioRectificacionCRAM.id;
}
