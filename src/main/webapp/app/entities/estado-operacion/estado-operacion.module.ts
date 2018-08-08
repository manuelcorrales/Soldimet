import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    EstadoOperacionComponent,
    EstadoOperacionDetailComponent,
    EstadoOperacionUpdateComponent,
    EstadoOperacionDeletePopupComponent,
    EstadoOperacionDeleteDialogComponent,
    estadoOperacionRoute,
    estadoOperacionPopupRoute
} from './';

const ENTITY_STATES = [...estadoOperacionRoute, ...estadoOperacionPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EstadoOperacionComponent,
        EstadoOperacionDetailComponent,
        EstadoOperacionUpdateComponent,
        EstadoOperacionDeleteDialogComponent,
        EstadoOperacionDeletePopupComponent
    ],
    entryComponents: [
        EstadoOperacionComponent,
        EstadoOperacionUpdateComponent,
        EstadoOperacionDeleteDialogComponent,
        EstadoOperacionDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetEstadoOperacionModule {}
