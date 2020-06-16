import { Moment } from 'moment';
import { IEstadoArticulo } from 'app/shared/model/estado-articulo.model';
import { IMarca } from 'app/shared/model/marca.model';
import { ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';

export interface IArticulo {
  id?: number;
  codigoArticuloProveedor?: string;
  valor?: number;
  fechaCosto?: Moment;
  estado?: IEstadoArticulo;
  marca?: IMarca;
  tipoRepuesto?: ITipoRepuesto;
}

export class Articulo implements IArticulo {
  constructor(
    public id?: number,
    public codigoArticuloProveedor?: string,
    public valor?: number,
    public fechaCosto?: Moment,
    public estado?: IEstadoArticulo,
    public marca?: IMarca,
    public tipoRepuesto?: ITipoRepuesto
  ) {}
}
