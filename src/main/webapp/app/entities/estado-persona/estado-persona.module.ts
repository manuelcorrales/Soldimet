import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    EstadoPersonaComponent,
    EstadoPersonaDetailComponent,
    EstadoPersonaUpdateComponent,
    EstadoPersonaDeletePopupComponent,
    EstadoPersonaDeleteDialogComponent,
    estadoPersonaRoute,
    estadoPersonaPopupRoute
} from './';

const ENTITY_STATES = [...estadoPersonaRoute, ...estadoPersonaPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EstadoPersonaComponent,
        EstadoPersonaDetailComponent,
        EstadoPersonaUpdateComponent,
        EstadoPersonaDeleteDialogComponent,
        EstadoPersonaDeletePopupComponent
    ],
    entryComponents: [
        EstadoPersonaComponent,
        EstadoPersonaUpdateComponent,
        EstadoPersonaDeleteDialogComponent,
        EstadoPersonaDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetEstadoPersonaModule {}
