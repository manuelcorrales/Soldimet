import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    EstadoMovimientoComponent,
    EstadoMovimientoDetailComponent,
    EstadoMovimientoUpdateComponent,
    EstadoMovimientoDeleteDialogComponent,
    EstadoMovimientoDeletePopupComponent,
    estadoMovimientoRoute,
    estadoMovimientoPopupRoute
} from 'app/entities/estado-movimiento';

const ENTITY_STATES = [...estadoMovimientoRoute, ...estadoMovimientoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EstadoMovimientoComponent,
        EstadoMovimientoDetailComponent,
        EstadoMovimientoDeleteDialogComponent,
        EstadoMovimientoDeletePopupComponent,
        EstadoMovimientoUpdateComponent
    ],
    entryComponents: [EstadoMovimientoComponent, EstadoMovimientoUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetEstadoMovimientoModule {}
