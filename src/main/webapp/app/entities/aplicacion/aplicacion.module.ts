import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    AplicacionComponent,
    AplicacionDetailComponent,
    AplicacionUpdateComponent,
    aplicacionRoute,
    aplicacionPopupRoute,
    AplicacionDeletePopupComponent
} from 'app/entities/aplicacion';

const ENTITY_STATES = [...aplicacionRoute, ...aplicacionPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [AplicacionComponent, AplicacionDetailComponent, AplicacionUpdateComponent, AplicacionDeletePopupComponent],
    entryComponents: [AplicacionComponent, AplicacionUpdateComponent, AplicacionDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetAplicacionModule {}
