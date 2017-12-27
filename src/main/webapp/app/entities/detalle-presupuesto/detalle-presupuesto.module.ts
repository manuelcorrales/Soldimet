import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    DetallePresupuestoService,
    DetallePresupuestoPopupService,
    DetallePresupuestoComponent,
    DetallePresupuestoDetailComponent,
    DetallePresupuestoDialogComponent,
    DetallePresupuestoPopupComponent,
    DetallePresupuestoDeletePopupComponent,
    DetallePresupuestoDeleteDialogComponent,
    detallePresupuestoRoute,
    detallePresupuestoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...detallePresupuestoRoute,
    ...detallePresupuestoPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DetallePresupuestoComponent,
        DetallePresupuestoDetailComponent,
        DetallePresupuestoDialogComponent,
        DetallePresupuestoDeleteDialogComponent,
        DetallePresupuestoPopupComponent,
        DetallePresupuestoDeletePopupComponent,
    ],
    entryComponents: [
        DetallePresupuestoComponent,
        DetallePresupuestoDialogComponent,
        DetallePresupuestoPopupComponent,
        DetallePresupuestoDeleteDialogComponent,
        DetallePresupuestoDeletePopupComponent,
    ],
    providers: [
        DetallePresupuestoService,
        DetallePresupuestoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetDetallePresupuestoModule {}
