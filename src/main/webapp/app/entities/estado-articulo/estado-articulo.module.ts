import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    EstadoArticuloComponent,
    EstadoArticuloDetailComponent,
    EstadoArticuloUpdateComponent,
    EstadoArticuloDeletePopupComponent,
    EstadoArticuloDeleteDialogComponent,
    estadoArticuloRoute,
    estadoArticuloPopupRoute
} from './';

const ENTITY_STATES = [...estadoArticuloRoute, ...estadoArticuloPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EstadoArticuloComponent,
        EstadoArticuloDetailComponent,
        EstadoArticuloUpdateComponent,
        EstadoArticuloDeleteDialogComponent,
        EstadoArticuloDeletePopupComponent
    ],
    entryComponents: [
        EstadoArticuloComponent,
        EstadoArticuloUpdateComponent,
        EstadoArticuloDeleteDialogComponent,
        EstadoArticuloDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetEstadoArticuloModule {}
