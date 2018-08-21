import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    MovimientoComponent,
    MovimientoDetailComponent,
    MovimientoUpdateComponent,
    MovimientoDeleteDialogComponent,
    MovimientoDeletePopupComponent,
    movimientoRoute,
    movimientoPopupRoute
} from './';

const ENTITY_STATES = [...movimientoRoute, ...movimientoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MovimientoComponent,
        MovimientoDeleteDialogComponent,
        MovimientoDeletePopupComponent,
        MovimientoDetailComponent,
        MovimientoUpdateComponent
    ],
    entryComponents: [MovimientoComponent, MovimientoUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetMovimientoModule {}
