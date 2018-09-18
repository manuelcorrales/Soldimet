import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosComponent } from 'app/pedidos/pedidos.component';
import { PEDIDOS_ROUTE, PEDIDOS_SUBROUTES } from 'app/pedidos/pedidos.route';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { PedidosPendientesComponent } from 'app/pedidos/pedidos-pendientes/pedidos-pendientes.component';
import { PedidosRecibidosComponent } from 'app/pedidos/pedidos-recibidos/pedidos-recibidos.component';
import { PedidosRealizadosComponent } from 'app/pedidos/pedidos-realizados/pedidos-realizados.component';
import { PedidoPendienteComponent } from 'app/pedidos/pedidos-pendientes/pedido-pendiente/pedido-pendiente.component';
import { DetallePedidoComponent } from 'app/pedidos/pedidos-pendientes/pedido-pendiente/detalle-pedido/detalle-pedido.component';
import { PedidosService } from 'app/pedidos/pedidos-services';
import { CostoRepuestoComponent } from './pedidos-pendientes/pedido-pendiente/detalle-pedido/costo-repuesto/costo-repuesto.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const ROUTES = [PEDIDOS_ROUTE, ...PEDIDOS_SUBROUTES];

@NgModule({
    imports: [NgbModule.forRoot(), CommonModule, BrowserModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule, NgbModule],
    entryComponents: [PedidosComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [PedidosService],
    declarations: [
        PedidosComponent,
        PedidosPendientesComponent,
        PedidosRecibidosComponent,
        PedidosRealizadosComponent,
        PedidoPendienteComponent,
        DetallePedidoComponent,
        CostoRepuestoComponent
    ]
})
export class PedidosModule {}
