import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    DetallePresupuestoComponent,
    DetallePresupuestoDetailComponent,
    DetallePresupuestoUpdateComponent,
    DetallePresupuestoDeleteDialogComponent,
    detallePresupuestoRoute,
    DetallePresupuestoDeletePopupComponent,
    detallePresupuestoPopupRoute
} from './';

const ENTITY_STATES = [...detallePresupuestoRoute, ...detallePresupuestoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DetallePresupuestoComponent,
        DetallePresupuestoDeletePopupComponent,
        DetallePresupuestoDetailComponent,
        DetallePresupuestoDeleteDialogComponent,
        DetallePresupuestoUpdateComponent
    ],
    entryComponents: [DetallePresupuestoComponent, DetallePresupuestoUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetDetallePresupuestoModule {}
