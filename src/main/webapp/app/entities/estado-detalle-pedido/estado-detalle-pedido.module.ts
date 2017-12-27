import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    EstadoDetallePedidoService,
    EstadoDetallePedidoPopupService,
    EstadoDetallePedidoComponent,
    EstadoDetallePedidoDetailComponent,
    EstadoDetallePedidoDialogComponent,
    EstadoDetallePedidoPopupComponent,
    EstadoDetallePedidoDeletePopupComponent,
    EstadoDetallePedidoDeleteDialogComponent,
    estadoDetallePedidoRoute,
    estadoDetallePedidoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...estadoDetallePedidoRoute,
    ...estadoDetallePedidoPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        EstadoDetallePedidoComponent,
        EstadoDetallePedidoDetailComponent,
        EstadoDetallePedidoDialogComponent,
        EstadoDetallePedidoDeleteDialogComponent,
        EstadoDetallePedidoPopupComponent,
        EstadoDetallePedidoDeletePopupComponent,
    ],
    entryComponents: [
        EstadoDetallePedidoComponent,
        EstadoDetallePedidoDialogComponent,
        EstadoDetallePedidoPopupComponent,
        EstadoDetallePedidoDeleteDialogComponent,
        EstadoDetallePedidoDeletePopupComponent,
    ],
    providers: [
        EstadoDetallePedidoService,
        EstadoDetallePedidoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetEstadoDetallePedidoModule {}
