import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    PagoEfectivoComponent,
    PagoEfectivoDetailComponent,
    PagoEfectivoUpdateComponent,
    PagoEfectivoDeletePopupComponent,
    PagoEfectivoDeleteDialogComponent,
    pagoEfectivoRoute,
    pagoEfectivoPopupRoute
} from './';

const ENTITY_STATES = [...pagoEfectivoRoute, ...pagoEfectivoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PagoEfectivoComponent,
        PagoEfectivoDetailComponent,
        PagoEfectivoUpdateComponent,
        PagoEfectivoDeleteDialogComponent,
        PagoEfectivoDeletePopupComponent
    ],
    entryComponents: [
        PagoEfectivoComponent,
        PagoEfectivoUpdateComponent,
        PagoEfectivoDeleteDialogComponent,
        PagoEfectivoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetPagoEfectivoModule {}
