import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    EstadoCobranzaOperacionComponent,
    EstadoCobranzaOperacionDetailComponent,
    EstadoCobranzaOperacionUpdateComponent,
    EstadoCobranzaOperacionDeletePopupComponent,
    EstadoCobranzaOperacionDeleteDialogComponent,
    estadoCobranzaOperacionRoute,
    estadoCobranzaOperacionPopupRoute
} from './';

const ENTITY_STATES = [...estadoCobranzaOperacionRoute, ...estadoCobranzaOperacionPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EstadoCobranzaOperacionComponent,
        EstadoCobranzaOperacionDetailComponent,
        EstadoCobranzaOperacionUpdateComponent,
        EstadoCobranzaOperacionDeleteDialogComponent,
        EstadoCobranzaOperacionDeletePopupComponent
    ],
    entryComponents: [
        EstadoCobranzaOperacionComponent,
        EstadoCobranzaOperacionUpdateComponent,
        EstadoCobranzaOperacionDeleteDialogComponent,
        EstadoCobranzaOperacionDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetEstadoCobranzaOperacionModule {}
