import { ITipoRepuesto } from 'app/entities/tipo-repuesto/tipo-repuesto.model';
import { IAplicacion } from 'app/entities/aplicacion/aplicacion.model';
import { ICilindrada } from 'app/entities/cilindrada/cilindrada.model';
import { IArticulo } from 'app/entities/articulo/articulo.model';

export interface ICostoRepuestoProveedor {
  id?: number;
  tipoRepuesto?: ITipoRepuesto;
  aplicacion?: IAplicacion;
  cilindrada?: ICilindrada;
  articulo?: IArticulo | null;
}

export class CostoRepuestoProveedor implements ICostoRepuestoProveedor {
  constructor(
    public id?: number,
    public tipoRepuesto?: ITipoRepuesto,
    public aplicacion?: IAplicacion,
    public cilindrada?: ICilindrada,
    public articulo?: IArticulo | null
  ) {}
}

export function getCostoRepuestoProveedorIdentifier(costoRepuestoProveedor: ICostoRepuestoProveedor): number | undefined {
  return costoRepuestoProveedor.id;
}
