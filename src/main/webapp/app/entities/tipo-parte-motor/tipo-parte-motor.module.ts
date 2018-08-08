import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    TipoParteMotorComponent,
    TipoParteMotorDetailComponent,
    TipoParteMotorUpdateComponent,
    TipoParteMotorDeletePopupComponent,
    TipoParteMotorDeleteDialogComponent,
    tipoParteMotorRoute,
    tipoParteMotorPopupRoute
} from './';

const ENTITY_STATES = [...tipoParteMotorRoute, ...tipoParteMotorPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TipoParteMotorComponent,
        TipoParteMotorDetailComponent,
        TipoParteMotorUpdateComponent,
        TipoParteMotorDeleteDialogComponent,
        TipoParteMotorDeletePopupComponent
    ],
    entryComponents: [
        TipoParteMotorComponent,
        TipoParteMotorUpdateComponent,
        TipoParteMotorDeleteDialogComponent,
        TipoParteMotorDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetTipoParteMotorModule {}
