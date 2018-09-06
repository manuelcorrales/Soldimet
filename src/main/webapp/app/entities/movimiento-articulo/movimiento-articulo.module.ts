import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    MovimientoArticuloComponent,
    MovimientoArticuloDetailComponent,
    MovimientoArticuloUpdateComponent,
    MovimientoArticuloDeleteDialogComponent,
    MovimientoArticuloDeletePopupComponent,
    movimientoArticuloRoute,
    movimientoArticuloPopupRoute
} from 'app/entities/movimiento-articulo';

const ENTITY_STATES = [...movimientoArticuloRoute, ...movimientoArticuloPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MovimientoArticuloComponent,
        MovimientoArticuloDeleteDialogComponent,
        MovimientoArticuloDeletePopupComponent,
        MovimientoArticuloDetailComponent,
        MovimientoArticuloUpdateComponent
    ],
    entryComponents: [MovimientoArticuloComponent, MovimientoArticuloUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetMovimientoArticuloModule {}
