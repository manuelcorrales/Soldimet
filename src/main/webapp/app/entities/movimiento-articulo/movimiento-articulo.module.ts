import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    MovimientoArticuloComponent,
    MovimientoArticuloDetailComponent,
    MovimientoArticuloUpdateComponent,
    MovimientoArticuloDeletePopupComponent,
    MovimientoArticuloDeleteDialogComponent,
    movimientoArticuloRoute,
    movimientoArticuloPopupRoute
} from './';

const ENTITY_STATES = [...movimientoArticuloRoute, ...movimientoArticuloPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MovimientoArticuloComponent,
        MovimientoArticuloDetailComponent,
        MovimientoArticuloUpdateComponent,
        MovimientoArticuloDeleteDialogComponent,
        MovimientoArticuloDeletePopupComponent
    ],
    entryComponents: [
        MovimientoArticuloComponent,
        MovimientoArticuloUpdateComponent,
        MovimientoArticuloDeleteDialogComponent,
        MovimientoArticuloDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetMovimientoArticuloModule {}
