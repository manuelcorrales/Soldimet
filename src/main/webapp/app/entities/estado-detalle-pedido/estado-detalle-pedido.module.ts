import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    EstadoDetallePedidoComponent,
    EstadoDetallePedidoDetailComponent,
    EstadoDetallePedidoUpdateComponent,
    EstadoDetallePedidoDeletePopupComponent,
    EstadoDetallePedidoDeleteDialogComponent,
    estadoDetallePedidoRoute,
    estadoDetallePedidoPopupRoute
} from './';

const ENTITY_STATES = [...estadoDetallePedidoRoute, ...estadoDetallePedidoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EstadoDetallePedidoComponent,
        EstadoDetallePedidoDetailComponent,
        EstadoDetallePedidoUpdateComponent,
        EstadoDetallePedidoDeleteDialogComponent,
        EstadoDetallePedidoDeletePopupComponent
    ],
    entryComponents: [
        EstadoDetallePedidoComponent,
        EstadoDetallePedidoUpdateComponent,
        EstadoDetallePedidoDeleteDialogComponent,
        EstadoDetallePedidoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetEstadoDetallePedidoModule {}
