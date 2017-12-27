import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    DetallePedidoService,
    DetallePedidoPopupService,
    DetallePedidoComponent,
    DetallePedidoDetailComponent,
    DetallePedidoDialogComponent,
    DetallePedidoPopupComponent,
    DetallePedidoDeletePopupComponent,
    DetallePedidoDeleteDialogComponent,
    detallePedidoRoute,
    detallePedidoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...detallePedidoRoute,
    ...detallePedidoPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DetallePedidoComponent,
        DetallePedidoDetailComponent,
        DetallePedidoDialogComponent,
        DetallePedidoDeleteDialogComponent,
        DetallePedidoPopupComponent,
        DetallePedidoDeletePopupComponent,
    ],
    entryComponents: [
        DetallePedidoComponent,
        DetallePedidoDialogComponent,
        DetallePedidoPopupComponent,
        DetallePedidoDeleteDialogComponent,
        DetallePedidoDeletePopupComponent,
    ],
    providers: [
        DetallePedidoService,
        DetallePedidoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetDetallePedidoModule {}
