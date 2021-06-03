import { IEstadoCostoRepuesto } from 'app/shared/model/estado-costo-repuesto.model';
import { IArticulo } from 'app/shared/model/articulo.model';
import { ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';
import { IMedidaArticulo } from 'app/shared/model/medida-articulo.model';

export interface ICostoRepuesto {
  id?: number;
  valor?: number;
  estado?: IEstadoCostoRepuesto;
  articulo?: IArticulo;
  tipoRepuesto?: ITipoRepuesto;
  medidaArticulo?: IMedidaArticulo;
}

export class CostoRepuesto implements ICostoRepuesto {
  constructor(
    public id?: number,
    public valor?: number,
    public estado?: IEstadoCostoRepuesto,
    public articulo?: IArticulo,
    public tipoRepuesto?: ITipoRepuesto,
    public medidaArticulo?: IMedidaArticulo
  ) {}
}
