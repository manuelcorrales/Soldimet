import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    EstadoCostoRepuestoComponent,
    EstadoCostoRepuestoDetailComponent,
    EstadoCostoRepuestoUpdateComponent,
    EstadoCostoRepuestoDeletePopupComponent,
    EstadoCostoRepuestoDeleteDialogComponent,
    estadoCostoRepuestoRoute,
    estadoCostoRepuestoPopupRoute
} from './';

const ENTITY_STATES = [...estadoCostoRepuestoRoute, ...estadoCostoRepuestoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EstadoCostoRepuestoComponent,
        EstadoCostoRepuestoDetailComponent,
        EstadoCostoRepuestoUpdateComponent,
        EstadoCostoRepuestoDeleteDialogComponent,
        EstadoCostoRepuestoDeletePopupComponent
    ],
    entryComponents: [
        EstadoCostoRepuestoComponent,
        EstadoCostoRepuestoUpdateComponent,
        EstadoCostoRepuestoDeleteDialogComponent,
        EstadoCostoRepuestoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetEstadoCostoRepuestoModule {}
