import { IEstadoArticulo } from 'app/shared/model/estado-articulo.model';
import { IMarca } from 'app/shared/model/marca.model';
import { ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';

export interface IArticulo {
  id?: number;
  descripcion?: string;
  codigoArticuloProveedor?: string;
  estado?: IEstadoArticulo;
  marca?: IMarca;
  tipoRepuesto?: ITipoRepuesto;
}

export class Articulo implements IArticulo {
  constructor(
    public id?: number,
    public descripcion?: string,
    public codigoArticuloProveedor?: string,
    public estado?: IEstadoArticulo,
    public marca?: IMarca,
    public tipoRepuesto?: ITipoRepuesto
  ) {}
}
