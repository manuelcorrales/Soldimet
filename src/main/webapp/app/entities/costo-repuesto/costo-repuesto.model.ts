import { IEstadoCostoRepuesto } from 'app/entities/estado-costo-repuesto/estado-costo-repuesto.model';
import { IArticulo } from 'app/entities/articulo/articulo.model';
import { ITipoRepuesto } from 'app/entities/tipo-repuesto/tipo-repuesto.model';
import { IMedidaArticulo } from 'app/entities/medida-articulo/medida-articulo.model';

export interface ICostoRepuesto {
  id?: number;
  valor?: number;
  estado?: IEstadoCostoRepuesto;
  articulo?: IArticulo | null;
  tipoRepuesto?: ITipoRepuesto | null;
  medidaArticulo?: IMedidaArticulo | null;
}

export class CostoRepuesto implements ICostoRepuesto {
  constructor(
    public id?: number,
    public valor?: number,
    public estado?: IEstadoCostoRepuesto,
    public articulo?: IArticulo | null,
    public tipoRepuesto?: ITipoRepuesto | null,
    public medidaArticulo?: IMedidaArticulo | null
  ) {}
}

export function getCostoRepuestoIdentifier(costoRepuesto: ICostoRepuesto): number | undefined {
  return costoRepuesto.id;
}
