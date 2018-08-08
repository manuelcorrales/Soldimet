import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    AplicacionComponent,
    AplicacionDetailComponent,
    AplicacionUpdateComponent,
    AplicacionDeletePopupComponent,
    AplicacionDeleteDialogComponent,
    aplicacionRoute,
    aplicacionPopupRoute
} from './';

const ENTITY_STATES = [...aplicacionRoute, ...aplicacionPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AplicacionComponent,
        AplicacionDetailComponent,
        AplicacionUpdateComponent,
        AplicacionDeleteDialogComponent,
        AplicacionDeletePopupComponent
    ],
    entryComponents: [AplicacionComponent, AplicacionUpdateComponent, AplicacionDeleteDialogComponent, AplicacionDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetAplicacionModule {}
