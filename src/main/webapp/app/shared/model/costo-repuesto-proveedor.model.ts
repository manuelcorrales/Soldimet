import { ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';
import { IAplicacion } from 'app/shared/model/aplicacion.model';
import { ICilindrada } from 'app/shared/model/cilindrada.model';
import { IArticulo } from 'app/shared/model/articulo.model';

export interface ICostoRepuestoProveedor {
  id?: number;
  tipoRepuesto?: ITipoRepuesto;
  aplicacion?: IAplicacion;
  cilindrada?: ICilindrada;
  articulo?: IArticulo;
}

export class CostoRepuestoProveedor implements ICostoRepuestoProveedor {
  constructor(
    public id?: number,
    public tipoRepuesto?: ITipoRepuesto,
    public aplicacion?: IAplicacion,
    public cilindrada?: ICilindrada,
    public articulo?: IArticulo
  ) {}
}
