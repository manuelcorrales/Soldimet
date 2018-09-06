import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    TipoParteMotorComponent,
    TipoParteMotorDetailComponent,
    TipoParteMotorUpdateComponent,
    TipoParteMotorDeleteDialogComponent,
    TipoParteMotorDeletePopupComponent,
    tipoParteMotorRoute,
    tipoParteMotorPopupRoute
} from 'app/entities/tipo-parte-motor';

const ENTITY_STATES = [...tipoParteMotorRoute, ...tipoParteMotorPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TipoParteMotorComponent,
        TipoParteMotorDeleteDialogComponent,
        TipoParteMotorDeletePopupComponent,
        TipoParteMotorDetailComponent,
        TipoParteMotorUpdateComponent
    ],
    entryComponents: [TipoParteMotorComponent, TipoParteMotorUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetTipoParteMotorModule {}
