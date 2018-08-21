import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    EstadoPedidoRepuestoComponent,
    EstadoPedidoRepuestoDetailComponent,
    EstadoPedidoRepuestoUpdateComponent,
    EstadoPedidoRepuestoDeleteDialogComponent,
    EstadoPedidoRepuestoDeletePopupComponent,
    estadoPedidoRepuestoRoute,
    estadoPedidoRepuestoPopupRoute
} from './';

const ENTITY_STATES = [...estadoPedidoRepuestoRoute, ...estadoPedidoRepuestoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EstadoPedidoRepuestoComponent,
        EstadoPedidoRepuestoDeleteDialogComponent,
        EstadoPedidoRepuestoDeletePopupComponent,
        EstadoPedidoRepuestoDetailComponent,
        EstadoPedidoRepuestoUpdateComponent
    ],
    entryComponents: [EstadoPedidoRepuestoComponent, EstadoPedidoRepuestoUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetEstadoPedidoRepuestoModule {}
