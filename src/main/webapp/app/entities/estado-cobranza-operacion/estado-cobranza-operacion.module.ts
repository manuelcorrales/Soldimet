import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    EstadoCobranzaOperacionComponent,
    EstadoCobranzaOperacionDetailComponent,
    EstadoCobranzaOperacionUpdateComponent,
    EstadoCobranzaOperacionDeletePopupComponent,
    estadoCobranzaOperacionRoute,
    estadoCobranzaOperacionPopupRoute
} from './';

const ENTITY_STATES = [...estadoCobranzaOperacionRoute, ...estadoCobranzaOperacionPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EstadoCobranzaOperacionComponent,
        EstadoCobranzaOperacionDetailComponent,
        EstadoCobranzaOperacionDeletePopupComponent,
        EstadoCobranzaOperacionUpdateComponent
    ],
    entryComponents: [EstadoCobranzaOperacionComponent, EstadoCobranzaOperacionUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetEstadoCobranzaOperacionModule {}
