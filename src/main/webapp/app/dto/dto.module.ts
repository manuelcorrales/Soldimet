import { DtoPresupuestoCabeceraComponent } from 'app/dto/dto-presupuesto-cabecera/dto-presupuesto-cabecera.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DTOListaPrecioManoDeObraComponent } from 'app/dto/dto-operaciones/dto-lista-costo-operaciones';
import { DtoPedidoCabecera } from 'app/dto/dto-pedidos/dto-pedido-cabecera';
import { DtoBusquedaProveedor } from 'app/dto/dto-pedidos/dto-proveedor-search';
@NgModule({
    imports: [],
    declarations: [DTOListaPrecioManoDeObraComponent, DtoPedidoCabecera, DtoBusquedaProveedor],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: []
})
export class DtoModule {}
