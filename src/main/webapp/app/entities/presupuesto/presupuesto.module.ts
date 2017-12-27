import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    PresupuestoService,
    PresupuestoPopupService,
    PresupuestoComponent,
    PresupuestoDetailComponent,
    PresupuestoDialogComponent,
    PresupuestoPopupComponent,
    PresupuestoDeletePopupComponent,
    PresupuestoDeleteDialogComponent,
    presupuestoRoute,
    presupuestoPopupRoute,
    PresupuestoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...presupuestoRoute,
    ...presupuestoPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PresupuestoComponent,
        PresupuestoDetailComponent,
        PresupuestoDialogComponent,
        PresupuestoDeleteDialogComponent,
        PresupuestoPopupComponent,
        PresupuestoDeletePopupComponent,
    ],
    entryComponents: [
        PresupuestoComponent,
        PresupuestoDialogComponent,
        PresupuestoPopupComponent,
        PresupuestoDeleteDialogComponent,
        PresupuestoDeletePopupComponent,
    ],
    providers: [
        PresupuestoService,
        PresupuestoPopupService,
        PresupuestoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetPresupuestoModule {}
