import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    MovimientoPresupuestoService,
    MovimientoPresupuestoPopupService,
    MovimientoPresupuestoComponent,
    MovimientoPresupuestoDetailComponent,
    MovimientoPresupuestoDialogComponent,
    MovimientoPresupuestoPopupComponent,
    MovimientoPresupuestoDeletePopupComponent,
    MovimientoPresupuestoDeleteDialogComponent,
    movimientoPresupuestoRoute,
    movimientoPresupuestoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...movimientoPresupuestoRoute,
    ...movimientoPresupuestoPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MovimientoPresupuestoComponent,
        MovimientoPresupuestoDetailComponent,
        MovimientoPresupuestoDialogComponent,
        MovimientoPresupuestoDeleteDialogComponent,
        MovimientoPresupuestoPopupComponent,
        MovimientoPresupuestoDeletePopupComponent,
    ],
    entryComponents: [
        MovimientoPresupuestoComponent,
        MovimientoPresupuestoDialogComponent,
        MovimientoPresupuestoPopupComponent,
        MovimientoPresupuestoDeleteDialogComponent,
        MovimientoPresupuestoDeletePopupComponent,
    ],
    providers: [
        MovimientoPresupuestoService,
        MovimientoPresupuestoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetMovimientoPresupuestoModule {}
