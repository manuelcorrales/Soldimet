import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    PresupuestoComponent,
    PresupuestoDetailComponent,
    PresupuestoUpdateComponent,
    PresupuestoDeletePopupComponent,
    PresupuestoDeleteDialogComponent,
    presupuestoRoute,
    presupuestoPopupRoute
} from 'app/entities/presupuesto';

const ENTITY_STATES = [...presupuestoRoute, ...presupuestoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PresupuestoComponent,
        PresupuestoDetailComponent,
        PresupuestoUpdateComponent,
        PresupuestoDeleteDialogComponent,
        PresupuestoDeletePopupComponent
    ],
    entryComponents: [PresupuestoComponent, PresupuestoUpdateComponent, PresupuestoDeleteDialogComponent, PresupuestoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetPresupuestoModule {}
