import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    PagoEfectivoService,
    PagoEfectivoPopupService,
    PagoEfectivoComponent,
    PagoEfectivoDetailComponent,
    PagoEfectivoDialogComponent,
    PagoEfectivoPopupComponent,
    PagoEfectivoDeletePopupComponent,
    PagoEfectivoDeleteDialogComponent,
    pagoEfectivoRoute,
    pagoEfectivoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...pagoEfectivoRoute,
    ...pagoEfectivoPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PagoEfectivoComponent,
        PagoEfectivoDetailComponent,
        PagoEfectivoDialogComponent,
        PagoEfectivoDeleteDialogComponent,
        PagoEfectivoPopupComponent,
        PagoEfectivoDeletePopupComponent,
    ],
    entryComponents: [
        PagoEfectivoComponent,
        PagoEfectivoDialogComponent,
        PagoEfectivoPopupComponent,
        PagoEfectivoDeleteDialogComponent,
        PagoEfectivoDeletePopupComponent,
    ],
    providers: [
        PagoEfectivoService,
        PagoEfectivoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetPagoEfectivoModule {}
