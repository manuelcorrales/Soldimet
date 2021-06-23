import { DtoMovimientoCabecera } from 'app/dto/dto-caja-dia/dto-caja-dia.component';
export class DtoPresupuestoCabeceraComponent {
  colapsado = true;
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
    public totalRepuestos?: number,
    public aplicacion?: string,
    public movimientos?: DtoMovimientoCabecera
  ) {}
}
