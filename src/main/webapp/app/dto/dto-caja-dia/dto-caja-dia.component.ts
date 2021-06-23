export class DtoCajaDia {
  constructor(
    public fechaCaja: string,
    public cajaId: number,
    public totalCaja: number,
    public estado: string,
    public totalMensual: number
  ) {}
}

export class DtoMovimientoCabecera {
  fecha: string;
  constructor(
    public movimientoId: number,
    public estado: string,
    public importe: number,
    public tipoMovimiento: string,
    public categoria: string,
    public formaDePago: string,
    public formaDePagoTip: string,
    public articulos: string[],
    public descripcion: string,
    public persona: string,
    public personaId: number,
    public presupuestoId: string,
    public observaciones: string,
    public empleado: string
  ) {}
}
