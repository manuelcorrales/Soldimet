import { ISubCategoria } from 'app/shared/model/sub-categoria.model';

export interface ICategoriaPago {
  id?: number;
  nombreCategoriaPago?: string;
  subCategorias?: ISubCategoria[];
}

export class CategoriaPago implements ICategoriaPago {
  constructor(public id?: number, public nombreCategoriaPago?: string, public subCategorias?: ISubCategoria[]) {}
}
