import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    EstadoPersonaComponent,
    EstadoPersonaDetailComponent,
    EstadoPersonaUpdateComponent,
    EstadoPersonaDeleteDialogComponent,
    EstadoPersonaDeletePopupComponent,
    estadoPersonaRoute,
    estadoPersonaPopupRoute
} from 'app/entities/estado-persona';

const ENTITY_STATES = [...estadoPersonaRoute, ...estadoPersonaPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EstadoPersonaComponent,
        EstadoPersonaDeleteDialogComponent,
        EstadoPersonaDeletePopupComponent,
        EstadoPersonaDetailComponent,
        EstadoPersonaUpdateComponent
    ],
    entryComponents: [EstadoPersonaComponent, EstadoPersonaUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetEstadoPersonaModule {}
