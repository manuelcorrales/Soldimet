import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    PedidoRepuestoComponent,
    PedidoRepuestoDetailComponent,
    PedidoRepuestoUpdateComponent,
    PedidoRepuestoDeleteDialogComponent,
    PedidoRepuestoDeletePopupComponent,
    pedidoRepuestoRoute,
    pedidoRepuestoPopupRoute
} from 'app/entities/pedido-repuesto';

const ENTITY_STATES = [...pedidoRepuestoRoute, ...pedidoRepuestoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PedidoRepuestoComponent,
        PedidoRepuestoDeleteDialogComponent,
        PedidoRepuestoDeletePopupComponent,
        PedidoRepuestoDetailComponent,
        PedidoRepuestoUpdateComponent,
        PedidoRepuestoDeleteDialogComponent,
        PedidoRepuestoDeletePopupComponent
    ],
    entryComponents: [
        PedidoRepuestoComponent,
        PedidoRepuestoUpdateComponent,
        PedidoRepuestoDeleteDialogComponent,
        PedidoRepuestoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetPedidoRepuestoModule {}
