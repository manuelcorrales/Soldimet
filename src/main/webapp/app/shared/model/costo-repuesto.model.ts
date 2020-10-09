import { IEstadoCostoRepuesto } from 'app/shared/model/estado-costo-repuesto.model';
import { IArticulo } from 'app/shared/model/articulo.model';
import { ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';

export interface ICostoRepuesto {
  id?: number;
  valor?: number;
  medida?: string;
  estado?: IEstadoCostoRepuesto;
  articulo?: IArticulo;
  tipoRepuesto?: ITipoRepuesto;
}

export class CostoRepuesto implements ICostoRepuesto {
  constructor(
    public id?: number,
    public valor?: number,
    public medida?: string,
    public estado?: IEstadoCostoRepuesto,
    public articulo?: IArticulo,
    public tipoRepuesto?: ITipoRepuesto
  ) {}
}
