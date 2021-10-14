import * as dayjs from 'dayjs';
import { IEstadoArticulo } from 'app/entities/estado-articulo/estado-articulo.model';
import { IMarca } from 'app/entities/marca/marca.model';
import { ITipoRepuesto } from 'app/entities/tipo-repuesto/tipo-repuesto.model';

export interface IArticulo {
  id?: number;
  codigoArticuloProveedor?: string | null;
  valor?: number;
  fechaCosto?: dayjs.Dayjs | null;
  costoProveedor?: number | null;
  fechaCostoProveedor?: dayjs.Dayjs | null;
  estado?: IEstadoArticulo;
  marca?: IMarca | null;
  tipoRepuesto?: ITipoRepuesto;
}

export class Articulo implements IArticulo {
  constructor(
    public id?: number,
    public codigoArticuloProveedor?: string | null,
    public valor?: number,
    public fechaCosto?: dayjs.Dayjs | null,
    public costoProveedor?: number | null,
    public fechaCostoProveedor?: dayjs.Dayjs | null,
    public estado?: IEstadoArticulo,
    public marca?: IMarca | null,
    public tipoRepuesto?: ITipoRepuesto
  ) {}
}

export function getArticuloIdentifier(articulo: IArticulo): number | undefined {
  return articulo.id;
}
