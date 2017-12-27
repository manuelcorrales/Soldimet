import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    EstadoPresupuestoService,
    EstadoPresupuestoPopupService,
    EstadoPresupuestoComponent,
    EstadoPresupuestoDetailComponent,
    EstadoPresupuestoDialogComponent,
    EstadoPresupuestoPopupComponent,
    EstadoPresupuestoDeletePopupComponent,
    EstadoPresupuestoDeleteDialogComponent,
    estadoPresupuestoRoute,
    estadoPresupuestoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...estadoPresupuestoRoute,
    ...estadoPresupuestoPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        EstadoPresupuestoComponent,
        EstadoPresupuestoDetailComponent,
        EstadoPresupuestoDialogComponent,
        EstadoPresupuestoDeleteDialogComponent,
        EstadoPresupuestoPopupComponent,
        EstadoPresupuestoDeletePopupComponent,
    ],
    entryComponents: [
        EstadoPresupuestoComponent,
        EstadoPresupuestoDialogComponent,
        EstadoPresupuestoPopupComponent,
        EstadoPresupuestoDeleteDialogComponent,
        EstadoPresupuestoDeletePopupComponent,
    ],
    providers: [
        EstadoPresupuestoService,
        EstadoPresupuestoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetEstadoPresupuestoModule {}
