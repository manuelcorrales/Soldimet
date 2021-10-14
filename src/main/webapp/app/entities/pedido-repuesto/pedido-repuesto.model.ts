import * as dayjs from 'dayjs';
import { IEstadoPedidoRepuesto } from 'app/entities/estado-pedido-repuesto/estado-pedido-repuesto.model';
import { IPresupuesto } from 'app/entities/presupuesto/presupuesto.model';
import { IDocumentationType } from 'app/entities/documentation-type/documentation-type.model';

export interface IPedidoRepuesto {
  id?: number;
  fechaCreacion?: dayjs.Dayjs;
  fechaPedido?: dayjs.Dayjs | null;
  fechaRecibo?: dayjs.Dayjs | null;
  estadoPedidoRepuesto?: IEstadoPedidoRepuesto;
  presupuesto?: IPresupuesto;
  documentType?: IDocumentationType | null;
}

export class PedidoRepuesto implements IPedidoRepuesto {
  constructor(
    public id?: number,
    public fechaCreacion?: dayjs.Dayjs,
    public fechaPedido?: dayjs.Dayjs | null,
    public fechaRecibo?: dayjs.Dayjs | null,
    public estadoPedidoRepuesto?: IEstadoPedidoRepuesto,
    public presupuesto?: IPresupuesto,
    public documentType?: IDocumentationType | null
  ) {}
}

export function getPedidoRepuestoIdentifier(pedidoRepuesto: IPedidoRepuesto): number | undefined {
  return pedidoRepuesto.id;
}
