import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    TipoParteMotorService,
    TipoParteMotorPopupService,
    TipoParteMotorComponent,
    TipoParteMotorDetailComponent,
    TipoParteMotorDialogComponent,
    TipoParteMotorPopupComponent,
    TipoParteMotorDeletePopupComponent,
    TipoParteMotorDeleteDialogComponent,
    tipoParteMotorRoute,
    tipoParteMotorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipoParteMotorRoute,
    ...tipoParteMotorPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TipoParteMotorComponent,
        TipoParteMotorDetailComponent,
        TipoParteMotorDialogComponent,
        TipoParteMotorDeleteDialogComponent,
        TipoParteMotorPopupComponent,
        TipoParteMotorDeletePopupComponent,
    ],
    entryComponents: [
        TipoParteMotorComponent,
        TipoParteMotorDialogComponent,
        TipoParteMotorPopupComponent,
        TipoParteMotorDeleteDialogComponent,
        TipoParteMotorDeletePopupComponent,
    ],
    providers: [
        TipoParteMotorService,
        TipoParteMotorPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetTipoParteMotorModule {}
