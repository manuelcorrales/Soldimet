export class DtoPedidoCabecera {
    constructor(
        public id: number,
        public fecha: Date,
        public cliente: string,
        public estado: string,
        public presupuestoId: number,
        public motor: string,
        public sucursal: string,
        public tipo: string
    ) {}
}
