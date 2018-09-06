import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    DetallePedidoComponent,
    DetallePedidoDetailComponent,
    DetallePedidoUpdateComponent,
    DetallePedidoDeleteDialogComponent,
    DetallePedidoDeletePopupComponent,
    detallePedidoRoute,
    detallePedidoPopupRoute
} from 'app/entities/detalle-pedido';

const ENTITY_STATES = [...detallePedidoRoute, ...detallePedidoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DetallePedidoComponent,
        DetallePedidoDetailComponent,
        DetallePedidoDeleteDialogComponent,
        DetallePedidoDeletePopupComponent,
        DetallePedidoUpdateComponent
    ],
    entryComponents: [DetallePedidoComponent, DetallePedidoUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetDetallePedidoModule {}
