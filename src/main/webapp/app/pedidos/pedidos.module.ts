import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosComponent, PedidoModalPopupService } from 'app/pedidos/pedidos.component';
import { PEDIDOS_SUBROUTES, PEDIDOS_NEW_POPUP_ROUTE } from 'app/pedidos/pedidos.route';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { PedidosPendientesComponent } from 'app/pedidos/pedidos-pendientes/pedidos-pendientes.component';
import { PedidosRecibidosComponent } from 'app/pedidos/pedidos-recibidos/pedidos-recibidos.component';
import { PedidosRealizadosComponent } from 'app/pedidos/pedidos-realizados/pedidos-realizados.component';
import {
    PedidoPendienteComponent,
    PedidoPendienteModalPopupComponent
} from 'app/pedidos/pedidos-pendientes/pedido-pendiente/pedido-pendiente.component';
import { DetallePedidoComponentNew } from 'app/pedidos/pedidos-pendientes/pedido-pendiente/detalle-pedido/detalle-pedido.component';
import { PedidosService } from 'app/pedidos/pedidos-services';
import { CostoRepuestoComponent } from './pedidos-pendientes/pedido-pendiente/detalle-pedido/costo-repuesto/costo-repuesto.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '../../../../../node_modules/@angular/forms';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';

const PEDIDOS_NEW_ROUTES_ALL = [...PEDIDOS_NEW_POPUP_ROUTE, ...PEDIDOS_SUBROUTES];

@NgModule({
    imports: [
        // NgxDatatableModule,
        NgbModule.forRoot(),
        CommonModule,
        BrowserModule,
        FormsModule,
        RouterModule.forChild(PEDIDOS_NEW_ROUTES_ALL)
    ],
    exports: [RouterModule, NgbModule],
    entryComponents: [PedidosComponent, PedidoPendienteModalPopupComponent, PedidoPendienteComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [PedidosService, PedidoModalPopupService],
    declarations: [
        PedidosComponent,
        PedidosPendientesComponent,
        PedidosRecibidosComponent,
        PedidosRealizadosComponent,
        PedidoPendienteComponent,
        DetallePedidoComponentNew,
        CostoRepuestoComponent,
        PedidoPendienteModalPopupComponent
    ]
})
export class PedidosModule {}
