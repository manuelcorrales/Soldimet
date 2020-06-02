import { Moment } from 'moment';
import { ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';
import { IMarca } from 'app/shared/model/marca.model';
import { ICilindrada } from 'app/shared/model/cilindrada.model';
import { IAplicacion } from 'app/shared/model/aplicacion.model';

export interface ICobranzaRepuesto {
  id?: number;
  valor?: number;
  detalle?: string;
  fecha?: Moment;
  tipoRepuesto?: ITipoRepuesto;
  marca?: IMarca;
  cilindrada?: ICilindrada;
  aplicacion?: IAplicacion;
}

export class CobranzaRepuesto implements ICobranzaRepuesto {
  constructor(
    public id?: number,
    public valor?: number,
    public detalle?: string,
    public fecha?: Moment,
    public tipoRepuesto?: ITipoRepuesto,
    public marca?: IMarca,
    public cilindrada?: ICilindrada,
    public aplicacion?: IAplicacion
  ) {}
}
