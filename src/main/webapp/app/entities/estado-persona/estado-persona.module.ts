import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    EstadoPersonaService,
    EstadoPersonaPopupService,
    EstadoPersonaComponent,
    EstadoPersonaDetailComponent,
    EstadoPersonaDialogComponent,
    EstadoPersonaPopupComponent,
    EstadoPersonaDeletePopupComponent,
    EstadoPersonaDeleteDialogComponent,
    estadoPersonaRoute,
    estadoPersonaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...estadoPersonaRoute,
    ...estadoPersonaPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        EstadoPersonaComponent,
        EstadoPersonaDetailComponent,
        EstadoPersonaDialogComponent,
        EstadoPersonaDeleteDialogComponent,
        EstadoPersonaPopupComponent,
        EstadoPersonaDeletePopupComponent,
    ],
    entryComponents: [
        EstadoPersonaComponent,
        EstadoPersonaDialogComponent,
        EstadoPersonaPopupComponent,
        EstadoPersonaDeleteDialogComponent,
        EstadoPersonaDeletePopupComponent,
    ],
    providers: [
        EstadoPersonaService,
        EstadoPersonaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetEstadoPersonaModule {}
