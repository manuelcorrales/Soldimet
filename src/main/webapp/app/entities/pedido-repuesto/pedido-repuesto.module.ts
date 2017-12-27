import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    PedidoRepuestoService,
    PedidoRepuestoPopupService,
    PedidoRepuestoComponent,
    PedidoRepuestoDetailComponent,
    PedidoRepuestoDialogComponent,
    PedidoRepuestoPopupComponent,
    PedidoRepuestoDeletePopupComponent,
    PedidoRepuestoDeleteDialogComponent,
    pedidoRepuestoRoute,
    pedidoRepuestoPopupRoute,
    PedidoRepuestoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...pedidoRepuestoRoute,
    ...pedidoRepuestoPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PedidoRepuestoComponent,
        PedidoRepuestoDetailComponent,
        PedidoRepuestoDialogComponent,
        PedidoRepuestoDeleteDialogComponent,
        PedidoRepuestoPopupComponent,
        PedidoRepuestoDeletePopupComponent,
    ],
    entryComponents: [
        PedidoRepuestoComponent,
        PedidoRepuestoDialogComponent,
        PedidoRepuestoPopupComponent,
        PedidoRepuestoDeleteDialogComponent,
        PedidoRepuestoDeletePopupComponent,
    ],
    providers: [
        PedidoRepuestoService,
        PedidoRepuestoPopupService,
        PedidoRepuestoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetPedidoRepuestoModule {}
