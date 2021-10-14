import { ITipoRepuesto } from 'app/entities/tipo-repuesto/tipo-repuesto.model';
import { IArticulo } from 'app/entities/articulo/articulo.model';

export interface ICobranzaRepuesto {
  id?: number;
  valor?: number;
  tipoRepuesto?: ITipoRepuesto;
  articulo?: IArticulo | null;
}

export class CobranzaRepuesto implements ICobranzaRepuesto {
  constructor(public id?: number, public valor?: number, public tipoRepuesto?: ITipoRepuesto, public articulo?: IArticulo | null) {}
}

export function getCobranzaRepuestoIdentifier(cobranzaRepuesto: ICobranzaRepuesto): number | undefined {
  return cobranzaRepuesto.id;
}
