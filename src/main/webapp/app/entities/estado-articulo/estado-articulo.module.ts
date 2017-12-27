import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    EstadoArticuloService,
    EstadoArticuloPopupService,
    EstadoArticuloComponent,
    EstadoArticuloDetailComponent,
    EstadoArticuloDialogComponent,
    EstadoArticuloPopupComponent,
    EstadoArticuloDeletePopupComponent,
    EstadoArticuloDeleteDialogComponent,
    estadoArticuloRoute,
    estadoArticuloPopupRoute,
} from './';

const ENTITY_STATES = [
    ...estadoArticuloRoute,
    ...estadoArticuloPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        EstadoArticuloComponent,
        EstadoArticuloDetailComponent,
        EstadoArticuloDialogComponent,
        EstadoArticuloDeleteDialogComponent,
        EstadoArticuloPopupComponent,
        EstadoArticuloDeletePopupComponent,
    ],
    entryComponents: [
        EstadoArticuloComponent,
        EstadoArticuloDialogComponent,
        EstadoArticuloPopupComponent,
        EstadoArticuloDeleteDialogComponent,
        EstadoArticuloDeletePopupComponent,
    ],
    providers: [
        EstadoArticuloService,
        EstadoArticuloPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetEstadoArticuloModule {}
