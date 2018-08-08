import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    DetallePedidoComponent,
    DetallePedidoDetailComponent,
    DetallePedidoUpdateComponent,
    DetallePedidoDeletePopupComponent,
    DetallePedidoDeleteDialogComponent,
    detallePedidoRoute,
    detallePedidoPopupRoute
} from './';

const ENTITY_STATES = [...detallePedidoRoute, ...detallePedidoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DetallePedidoComponent,
        DetallePedidoDetailComponent,
        DetallePedidoUpdateComponent,
        DetallePedidoDeleteDialogComponent,
        DetallePedidoDeletePopupComponent
    ],
    entryComponents: [
        DetallePedidoComponent,
        DetallePedidoUpdateComponent,
        DetallePedidoDeleteDialogComponent,
        DetallePedidoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetDetallePedidoModule {}
