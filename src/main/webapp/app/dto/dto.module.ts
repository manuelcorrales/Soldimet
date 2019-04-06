import { DtoPresupuestoCabeceraComponent } from 'app/dto/dto-presupuesto-cabecera/dto-presupuesto-cabecera.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DTOListaPrecioManoDeObraComponent } from 'app/dto/dto-operaciones/dto-lista-costo-operaciones';
import { DtoPedidoCabecera } from 'app/dto/dto-pedidos/dto-pedido-cabecera';
import { DtoBusquedaProveedor } from 'app/dto/dto-pedidos/dto-proveedor-search';
import { DtoCajaDiaComponent, DtoMovimientoCabecera } from './dto-caja-dia/dto-caja-dia.component';
import { DtoPresupuestoCobroRepuestoComponent } from './dto-presupuesto-cabecera/dto-presupuesto-cobro-repuesto.component';
@NgModule({
    imports: [],
    declarations: [
        DTOListaPrecioManoDeObraComponent,
        DtoPedidoCabecera,
        DtoBusquedaProveedor,
        DtoCajaDiaComponent,
        DtoMovimientoCabecera,
        DtoPresupuestoCobroRepuestoComponent
    ],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: []
})
export class DtoModule {}
