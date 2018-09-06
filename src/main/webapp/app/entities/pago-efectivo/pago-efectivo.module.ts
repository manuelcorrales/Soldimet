import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    PagoEfectivoComponent,
    PagoEfectivoDetailComponent,
    PagoEfectivoUpdateComponent,
    PagoEfectivoDeleteDialogComponent,
    PagoEfectivoDeletePopupComponent,
    pagoEfectivoRoute,
    pagoEfectivoPopupRoute
} from 'app/entities/pago-efectivo';

const ENTITY_STATES = [...pagoEfectivoRoute, ...pagoEfectivoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PagoEfectivoComponent,
        PagoEfectivoDeleteDialogComponent,
        PagoEfectivoDeletePopupComponent,
        PagoEfectivoDetailComponent,
        PagoEfectivoUpdateComponent
    ],
    entryComponents: [PagoEfectivoComponent, PagoEfectivoUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetPagoEfectivoModule {}
