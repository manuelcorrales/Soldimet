import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    EstadoPresupuestoComponent,
    EstadoPresupuestoDetailComponent,
    EstadoPresupuestoUpdateComponent,
    EstadoPresupuestoDeleteDialogComponent,
    EstadoPresupuestoDeletePopupComponent,
    estadoPresupuestoRoute,
    estadoPresupuestoPopupRoute
} from './';

const ENTITY_STATES = [...estadoPresupuestoRoute, ...estadoPresupuestoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EstadoPresupuestoComponent,
        EstadoPresupuestoDeleteDialogComponent,
        EstadoPresupuestoDeletePopupComponent,
        EstadoPresupuestoDetailComponent,
        EstadoPresupuestoUpdateComponent
    ],
    entryComponents: [EstadoPresupuestoComponent, EstadoPresupuestoUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetEstadoPresupuestoModule {}
