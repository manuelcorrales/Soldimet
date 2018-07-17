import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    MovimientoPedidoService,
    MovimientoPedidoPopupService,
    MovimientoPedidoComponent,
    MovimientoPedidoDetailComponent,
    MovimientoPedidoDialogComponent,
    MovimientoPedidoPopupComponent,
    MovimientoPedidoDeletePopupComponent,
    MovimientoPedidoDeleteDialogComponent,
    movimientoPedidoRoute,
    movimientoPedidoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...movimientoPedidoRoute,
    ...movimientoPedidoPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MovimientoPedidoComponent,
        MovimientoPedidoDetailComponent,
        MovimientoPedidoDialogComponent,
        MovimientoPedidoDeleteDialogComponent,
        MovimientoPedidoPopupComponent,
        MovimientoPedidoDeletePopupComponent,
    ],
    entryComponents: [
        MovimientoPedidoComponent,
        MovimientoPedidoDialogComponent,
        MovimientoPedidoPopupComponent,
        MovimientoPedidoDeleteDialogComponent,
        MovimientoPedidoDeletePopupComponent,
    ],
    providers: [
        MovimientoPedidoService,
        MovimientoPedidoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetMovimientoPedidoModule {}
