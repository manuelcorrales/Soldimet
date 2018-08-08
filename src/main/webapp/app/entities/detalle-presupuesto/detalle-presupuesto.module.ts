import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    DetallePresupuestoComponent,
    DetallePresupuestoDetailComponent,
    DetallePresupuestoUpdateComponent,
    DetallePresupuestoDeletePopupComponent,
    DetallePresupuestoDeleteDialogComponent,
    detallePresupuestoRoute,
    detallePresupuestoPopupRoute
} from './';

const ENTITY_STATES = [...detallePresupuestoRoute, ...detallePresupuestoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DetallePresupuestoComponent,
        DetallePresupuestoDetailComponent,
        DetallePresupuestoUpdateComponent,
        DetallePresupuestoDeleteDialogComponent,
        DetallePresupuestoDeletePopupComponent
    ],
    entryComponents: [
        DetallePresupuestoComponent,
        DetallePresupuestoUpdateComponent,
        DetallePresupuestoDeleteDialogComponent,
        DetallePresupuestoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetDetallePresupuestoModule {}
