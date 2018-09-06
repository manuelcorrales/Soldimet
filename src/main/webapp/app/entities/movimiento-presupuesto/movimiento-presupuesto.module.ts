import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    MovimientoPresupuestoComponent,
    MovimientoPresupuestoDetailComponent,
    MovimientoPresupuestoUpdateComponent,
    MovimientoPresupuestoDeleteDialogComponent,
    MovimientoPresupuestoDeletePopupComponent,
    movimientoPresupuestoRoute,
    movimientoPresupuestoPopupRoute
} from 'app/entities/movimiento-presupuesto';

const ENTITY_STATES = [...movimientoPresupuestoRoute, ...movimientoPresupuestoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MovimientoPresupuestoComponent,
        MovimientoPresupuestoDetailComponent,
        MovimientoPresupuestoDeleteDialogComponent,
        MovimientoPresupuestoDeletePopupComponent,
        MovimientoPresupuestoUpdateComponent
    ],
    entryComponents: [MovimientoPresupuestoComponent, MovimientoPresupuestoUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetMovimientoPresupuestoModule {}
