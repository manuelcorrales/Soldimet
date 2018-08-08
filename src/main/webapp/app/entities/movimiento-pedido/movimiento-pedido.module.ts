import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    MovimientoPedidoComponent,
    MovimientoPedidoDetailComponent,
    MovimientoPedidoUpdateComponent,
    MovimientoPedidoDeletePopupComponent,
    MovimientoPedidoDeleteDialogComponent,
    movimientoPedidoRoute,
    movimientoPedidoPopupRoute
} from './';

const ENTITY_STATES = [...movimientoPedidoRoute, ...movimientoPedidoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MovimientoPedidoComponent,
        MovimientoPedidoDetailComponent,
        MovimientoPedidoUpdateComponent,
        MovimientoPedidoDeleteDialogComponent,
        MovimientoPedidoDeletePopupComponent
    ],
    entryComponents: [
        MovimientoPedidoComponent,
        MovimientoPedidoUpdateComponent,
        MovimientoPedidoDeleteDialogComponent,
        MovimientoPedidoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetMovimientoPedidoModule {}
