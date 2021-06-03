import { Aplicacion } from 'app/shared/model/aplicacion.model';
export class DTOStockRepuestoCabecera {
  constructor(
    public id: number,
    public codigo: string,
    public marca: string,
    public costo: number,
    public venta: number,
    public medida: string,
    public tipoRepuesto: string,
    public aplicaciones: Aplicacion[],
    public cantidad: number
  ) {}
}
