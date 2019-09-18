import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    MovimientoComponent,
    MovimientoDetailComponent,
    MovimientoUpdateComponent,
    MovimientoDeletePopupComponent,
    MovimientoDeleteDialogComponent,
    movimientoRoute,
    movimientoPopupRoute
} from 'app/entities/movimiento';

const ENTITY_STATES = [...movimientoRoute, ...movimientoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MovimientoComponent,
        MovimientoDetailComponent,
        MovimientoUpdateComponent,
        MovimientoDeleteDialogComponent,
        MovimientoDeletePopupComponent
    ],
    entryComponents: [MovimientoComponent, MovimientoUpdateComponent, MovimientoDeleteDialogComponent, MovimientoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetMovimientoModule {}
