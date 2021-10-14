import { IMedidaArticulo } from 'app/entities/medida-articulo/medida-articulo.model';

export interface IDetallMovimiento {
  id?: number;
  medida?: IMedidaArticulo | null;
}

export class DetallMovimiento implements IDetallMovimiento {
  constructor(public id?: number, public medida?: IMedidaArticulo | null) {}
}

export function getDetallMovimientoIdentifier(detallMovimiento: IDetallMovimiento): number | undefined {
  return detallMovimiento.id;
}
