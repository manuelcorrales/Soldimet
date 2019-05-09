import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    EstadoArticuloComponent,
    EstadoArticuloDetailComponent,
    EstadoArticuloUpdateComponent,
    estadoArticuloRoute,
    EstadoArticuloDeletePopupComponent,
    EstadoArticuloDeleteDialogComponent,
    estadoArticuloPopupRoute
} from 'app/entities/estado-articulo';

const ENTITY_STATES = [...estadoArticuloRoute, ...estadoArticuloPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EstadoArticuloComponent,
        EstadoArticuloDetailComponent,
        EstadoArticuloDeletePopupComponent,
        EstadoArticuloDeleteDialogComponent,
        EstadoArticuloUpdateComponent
    ],
    entryComponents: [EstadoArticuloComponent, EstadoArticuloUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetEstadoArticuloModule {}
