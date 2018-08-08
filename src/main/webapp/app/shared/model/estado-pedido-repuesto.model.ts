export interface IEstadoPedidoRepuesto {
    id?: number;
    nombreEstado?: string;
}

export class EstadoPedidoRepuesto implements IEstadoPedidoRepuesto {
    constructor(public id?: number, public nombreEstado?: string) {}
}
