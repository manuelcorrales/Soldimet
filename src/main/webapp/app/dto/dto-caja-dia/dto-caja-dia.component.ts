export class DtoCajaDiaComponent {
  constructor(
    public fechaCaja: string,
    public cajaId: Number,
    public estadoCaja: string,
    public totalCaja: Number,
    public totalMensual: Number,
    public estado: string,
    public movimientos: DtoMovimientoCabecera[]
  ) {}
}

export class DtoMovimientoCabecera {
  constructor(
    public movimientoId: Number,
    public descripcion: string,
    public categoria: string,
    public monto: Number,
    public tipoMovimiento: string,
    public formaDePagoTip: string,
    public formaDePago: string
  ) {}
}
