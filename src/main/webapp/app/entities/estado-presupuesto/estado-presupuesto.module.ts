import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    EstadoPresupuestoComponent,
    EstadoPresupuestoDetailComponent,
    EstadoPresupuestoUpdateComponent,
    EstadoPresupuestoDeletePopupComponent,
    EstadoPresupuestoDeleteDialogComponent,
    estadoPresupuestoRoute,
    estadoPresupuestoPopupRoute
} from './';

const ENTITY_STATES = [...estadoPresupuestoRoute, ...estadoPresupuestoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EstadoPresupuestoComponent,
        EstadoPresupuestoDetailComponent,
        EstadoPresupuestoUpdateComponent,
        EstadoPresupuestoDeleteDialogComponent,
        EstadoPresupuestoDeletePopupComponent
    ],
    entryComponents: [
        EstadoPresupuestoComponent,
        EstadoPresupuestoUpdateComponent,
        EstadoPresupuestoDeleteDialogComponent,
        EstadoPresupuestoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetEstadoPresupuestoModule {}
