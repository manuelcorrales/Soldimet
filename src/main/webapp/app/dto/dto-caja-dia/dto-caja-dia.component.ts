export class DtoCajaDiaComponent {
  constructor(
    public fechaCaja: string,
    public cajaId: Number,
    public estadoCaja: string,
    public totalCaja: Number,
    public estado: string,
    public movimientos: DtoMovimientoCabecera[]
  ) {}
}

export class DtoMovimientoCabecera {
  fecha: string;
  constructor(
    public movimientoId: Number,
    public descripcion: string,
    public categoria: string,
    public monto: Number,
    public tipoMovimiento: string,
    public formaDePagoTip: string,
    public presupuestoId: string,
    public formaDePago: string
  ) {}
}

export class DtoCaja {
  constructor(public totalMensual: number, public cajas: DtoCajaDiaComponent[]) {}
}
