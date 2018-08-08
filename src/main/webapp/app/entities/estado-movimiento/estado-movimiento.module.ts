import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    EstadoMovimientoComponent,
    EstadoMovimientoDetailComponent,
    EstadoMovimientoUpdateComponent,
    EstadoMovimientoDeletePopupComponent,
    EstadoMovimientoDeleteDialogComponent,
    estadoMovimientoRoute,
    estadoMovimientoPopupRoute
} from './';

const ENTITY_STATES = [...estadoMovimientoRoute, ...estadoMovimientoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EstadoMovimientoComponent,
        EstadoMovimientoDetailComponent,
        EstadoMovimientoUpdateComponent,
        EstadoMovimientoDeleteDialogComponent,
        EstadoMovimientoDeletePopupComponent
    ],
    entryComponents: [
        EstadoMovimientoComponent,
        EstadoMovimientoUpdateComponent,
        EstadoMovimientoDeleteDialogComponent,
        EstadoMovimientoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetEstadoMovimientoModule {}
