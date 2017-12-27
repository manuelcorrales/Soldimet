import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    EstadoPedidoRepuestoService,
    EstadoPedidoRepuestoPopupService,
    EstadoPedidoRepuestoComponent,
    EstadoPedidoRepuestoDetailComponent,
    EstadoPedidoRepuestoDialogComponent,
    EstadoPedidoRepuestoPopupComponent,
    EstadoPedidoRepuestoDeletePopupComponent,
    EstadoPedidoRepuestoDeleteDialogComponent,
    estadoPedidoRepuestoRoute,
    estadoPedidoRepuestoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...estadoPedidoRepuestoRoute,
    ...estadoPedidoRepuestoPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        EstadoPedidoRepuestoComponent,
        EstadoPedidoRepuestoDetailComponent,
        EstadoPedidoRepuestoDialogComponent,
        EstadoPedidoRepuestoDeleteDialogComponent,
        EstadoPedidoRepuestoPopupComponent,
        EstadoPedidoRepuestoDeletePopupComponent,
    ],
    entryComponents: [
        EstadoPedidoRepuestoComponent,
        EstadoPedidoRepuestoDialogComponent,
        EstadoPedidoRepuestoPopupComponent,
        EstadoPedidoRepuestoDeleteDialogComponent,
        EstadoPedidoRepuestoDeletePopupComponent,
    ],
    providers: [
        EstadoPedidoRepuestoService,
        EstadoPedidoRepuestoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetEstadoPedidoRepuestoModule {}
