import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    EstadoOperacionService,
    EstadoOperacionPopupService,
    EstadoOperacionComponent,
    EstadoOperacionDetailComponent,
    EstadoOperacionDialogComponent,
    EstadoOperacionPopupComponent,
    EstadoOperacionDeletePopupComponent,
    EstadoOperacionDeleteDialogComponent,
    estadoOperacionRoute,
    estadoOperacionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...estadoOperacionRoute,
    ...estadoOperacionPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        EstadoOperacionComponent,
        EstadoOperacionDetailComponent,
        EstadoOperacionDialogComponent,
        EstadoOperacionDeleteDialogComponent,
        EstadoOperacionPopupComponent,
        EstadoOperacionDeletePopupComponent,
    ],
    entryComponents: [
        EstadoOperacionComponent,
        EstadoOperacionDialogComponent,
        EstadoOperacionPopupComponent,
        EstadoOperacionDeleteDialogComponent,
        EstadoOperacionDeletePopupComponent,
    ],
    providers: [
        EstadoOperacionService,
        EstadoOperacionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetEstadoOperacionModule {}
