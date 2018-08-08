import { ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';
import { IArticulo } from 'app/shared/model/articulo.model';
import { IProveedor } from 'app/shared/model/proveedor.model';

export interface ICostoRepuesto {
    id?: number;
    valor?: number;
    tipoRepuesto?: ITipoRepuesto;
    articulo?: IArticulo;
    proveedor?: IProveedor;
}

export class CostoRepuesto implements ICostoRepuesto {
    constructor(
        public id?: number,
        public valor?: number,
        public tipoRepuesto?: ITipoRepuesto,
        public articulo?: IArticulo,
        public proveedor?: IProveedor
    ) {}
}
