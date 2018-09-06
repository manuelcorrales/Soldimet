import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    EstadoOperacionComponent,
    EstadoOperacionDetailComponent,
    EstadoOperacionUpdateComponent,
    estadoOperacionRoute,
    EstadoOperacionDeleteDialogComponent,
    EstadoOperacionDeletePopupComponent,
    estadoOperacionPopupRoute
} from 'app/entities/estado-operacion';

const ENTITY_STATES = [...estadoOperacionRoute, ...estadoOperacionPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EstadoOperacionComponent,
        EstadoOperacionDeleteDialogComponent,
        EstadoOperacionDeletePopupComponent,
        EstadoOperacionDetailComponent,
        EstadoOperacionUpdateComponent
    ],
    entryComponents: [EstadoOperacionComponent, EstadoOperacionUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetEstadoOperacionModule {}
