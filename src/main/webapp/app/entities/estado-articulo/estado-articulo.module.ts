import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    EstadoArticuloComponent,
    EstadoArticuloDetailComponent,
    EstadoArticuloUpdateComponent,
    estadoArticuloRoute,
    EstadoArticuloDeletePopupComponent,
    estadoArticuloPopupRoute
} from './';

const ENTITY_STATES = [...estadoArticuloRoute, ...estadoArticuloPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EstadoArticuloComponent,
        EstadoArticuloDetailComponent,
        EstadoArticuloDeletePopupComponent,
        EstadoArticuloUpdateComponent
    ],
    entryComponents: [EstadoArticuloComponent, EstadoArticuloUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetEstadoArticuloModule {}
