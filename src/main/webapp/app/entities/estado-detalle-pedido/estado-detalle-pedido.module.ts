import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    EstadoDetallePedidoComponent,
    EstadoDetallePedidoDetailComponent,
    EstadoDetallePedidoUpdateComponent,
    estadoDetallePedidoRoute,
    EstadoDetallePedidoDeletePopupComponent,
    EstadoDetallePedidoDeleteDialogComponent,
    estadoDetallePedidoPopupRoute
} from './';

const ENTITY_STATES = [...estadoDetallePedidoRoute, ...estadoDetallePedidoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EstadoDetallePedidoComponent,
        EstadoDetallePedidoDeletePopupComponent,
        EstadoDetallePedidoDetailComponent,
        EstadoDetallePedidoDeleteDialogComponent,
        EstadoDetallePedidoUpdateComponent
    ],
    entryComponents: [EstadoDetallePedidoComponent, EstadoDetallePedidoUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetEstadoDetallePedidoModule {}
