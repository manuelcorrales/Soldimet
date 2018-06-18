import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    MovimientoArticuloService,
    MovimientoArticuloPopupService,
    MovimientoArticuloComponent,
    MovimientoArticuloDetailComponent,
    MovimientoArticuloDialogComponent,
    MovimientoArticuloPopupComponent,
    MovimientoArticuloDeletePopupComponent,
    MovimientoArticuloDeleteDialogComponent,
    movimientoArticuloRoute,
    movimientoArticuloPopupRoute,
} from './';

const ENTITY_STATES = [
    ...movimientoArticuloRoute,
    ...movimientoArticuloPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MovimientoArticuloComponent,
        MovimientoArticuloDetailComponent,
        MovimientoArticuloDialogComponent,
        MovimientoArticuloDeleteDialogComponent,
        MovimientoArticuloPopupComponent,
        MovimientoArticuloDeletePopupComponent,
    ],
    entryComponents: [
        MovimientoArticuloComponent,
        MovimientoArticuloDialogComponent,
        MovimientoArticuloPopupComponent,
        MovimientoArticuloDeleteDialogComponent,
        MovimientoArticuloDeletePopupComponent,
    ],
    providers: [
        MovimientoArticuloService,
        MovimientoArticuloPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetMovimientoArticuloModule {}
