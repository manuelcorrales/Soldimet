import { ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';

export interface ICobranzaRepuesto {
  id?: number;
  valor?: number;
  tipoRepuesto?: ITipoRepuesto;
}

export class CobranzaRepuesto implements ICobranzaRepuesto {
  constructor(public id?: number, public valor?: number, public tipoRepuesto?: ITipoRepuesto) {}
}
