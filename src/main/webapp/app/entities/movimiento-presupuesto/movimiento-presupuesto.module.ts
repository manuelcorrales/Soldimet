import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    MovimientoPresupuestoComponent,
    MovimientoPresupuestoDetailComponent,
    MovimientoPresupuestoUpdateComponent,
    MovimientoPresupuestoDeletePopupComponent,
    MovimientoPresupuestoDeleteDialogComponent,
    movimientoPresupuestoRoute,
    movimientoPresupuestoPopupRoute
} from './';

const ENTITY_STATES = [...movimientoPresupuestoRoute, ...movimientoPresupuestoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MovimientoPresupuestoComponent,
        MovimientoPresupuestoDetailComponent,
        MovimientoPresupuestoUpdateComponent,
        MovimientoPresupuestoDeleteDialogComponent,
        MovimientoPresupuestoDeletePopupComponent
    ],
    entryComponents: [
        MovimientoPresupuestoComponent,
        MovimientoPresupuestoUpdateComponent,
        MovimientoPresupuestoDeleteDialogComponent,
        MovimientoPresupuestoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetMovimientoPresupuestoModule {}
