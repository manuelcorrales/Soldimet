import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    EstadoCobranzaOperacionService,
    EstadoCobranzaOperacionPopupService,
    EstadoCobranzaOperacionComponent,
    EstadoCobranzaOperacionDetailComponent,
    EstadoCobranzaOperacionDialogComponent,
    EstadoCobranzaOperacionPopupComponent,
    EstadoCobranzaOperacionDeletePopupComponent,
    EstadoCobranzaOperacionDeleteDialogComponent,
    estadoCobranzaOperacionRoute,
    estadoCobranzaOperacionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...estadoCobranzaOperacionRoute,
    ...estadoCobranzaOperacionPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        EstadoCobranzaOperacionComponent,
        EstadoCobranzaOperacionDetailComponent,
        EstadoCobranzaOperacionDialogComponent,
        EstadoCobranzaOperacionDeleteDialogComponent,
        EstadoCobranzaOperacionPopupComponent,
        EstadoCobranzaOperacionDeletePopupComponent,
    ],
    entryComponents: [
        EstadoCobranzaOperacionComponent,
        EstadoCobranzaOperacionDialogComponent,
        EstadoCobranzaOperacionPopupComponent,
        EstadoCobranzaOperacionDeleteDialogComponent,
        EstadoCobranzaOperacionDeletePopupComponent,
    ],
    providers: [
        EstadoCobranzaOperacionService,
        EstadoCobranzaOperacionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetEstadoCobranzaOperacionModule {}
