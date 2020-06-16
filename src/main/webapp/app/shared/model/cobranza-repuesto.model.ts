import { ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';
import { IArticulo } from 'app/shared/model/articulo.model';

export interface ICobranzaRepuesto {
  id?: number;
  valor?: number;
  tipoRepuesto?: ITipoRepuesto;
  articulo?: IArticulo;
}

export class CobranzaRepuesto implements ICobranzaRepuesto {
  constructor(public id?: number, public valor?: number, public tipoRepuesto?: ITipoRepuesto, public articulo?: IArticulo) {}
}
