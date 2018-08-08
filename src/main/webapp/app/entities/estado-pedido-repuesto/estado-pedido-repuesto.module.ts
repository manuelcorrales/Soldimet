import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    EstadoPedidoRepuestoComponent,
    EstadoPedidoRepuestoDetailComponent,
    EstadoPedidoRepuestoUpdateComponent,
    EstadoPedidoRepuestoDeletePopupComponent,
    EstadoPedidoRepuestoDeleteDialogComponent,
    estadoPedidoRepuestoRoute,
    estadoPedidoRepuestoPopupRoute
} from './';

const ENTITY_STATES = [...estadoPedidoRepuestoRoute, ...estadoPedidoRepuestoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EstadoPedidoRepuestoComponent,
        EstadoPedidoRepuestoDetailComponent,
        EstadoPedidoRepuestoUpdateComponent,
        EstadoPedidoRepuestoDeleteDialogComponent,
        EstadoPedidoRepuestoDeletePopupComponent
    ],
    entryComponents: [
        EstadoPedidoRepuestoComponent,
        EstadoPedidoRepuestoUpdateComponent,
        EstadoPedidoRepuestoDeleteDialogComponent,
        EstadoPedidoRepuestoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetEstadoPedidoRepuestoModule {}
