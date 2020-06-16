import { ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';
import { IProveedor } from 'app/shared/model/proveedor.model';
import { IEstadoCostoRepuesto } from 'app/shared/model/estado-costo-repuesto.model';

export interface ICostoRepuesto {
  id?: number;
  valor?: number;
  tipoRepuesto?: ITipoRepuesto;
  proveedor?: IProveedor;
  estado?: IEstadoCostoRepuesto;
}

export class CostoRepuesto implements ICostoRepuesto {
  constructor(
    public id?: number,
    public valor?: number,
    public tipoRepuesto?: ITipoRepuesto,
    public proveedor?: IProveedor,
    public estado?: IEstadoCostoRepuesto
  ) {}
}
