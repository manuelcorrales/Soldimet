export class DtoPresupuestoCabeceraComponent {
  constructor(
    public codigo?: number,
    public fecha?: any,
    public motor?: string,
    public cliente?: string,
    public sucursal?: string,
    public importe?: number,
    public estado?: string,
    public isSoldadura?: boolean,
    public isModelo?: boolean,
    public totalOperaciones?: number,
    public totalRepuestos?: number
  ) {}
}
