import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    CostoOperacionComponent,
    CostoOperacionDetailComponent,
    CostoOperacionUpdateComponent,
    CostoOperacionDeletePopupComponent,
    CostoOperacionDeleteDialogComponent,
    costoOperacionRoute,
    costoOperacionPopupRoute
} from './';

const ENTITY_STATES = [...costoOperacionRoute, ...costoOperacionPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CostoOperacionComponent,
        CostoOperacionDetailComponent,
        CostoOperacionUpdateComponent,
        CostoOperacionDeleteDialogComponent,
        CostoOperacionDeletePopupComponent
    ],
    entryComponents: [
        CostoOperacionComponent,
        CostoOperacionUpdateComponent,
        CostoOperacionDeleteDialogComponent,
        CostoOperacionDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetCostoOperacionModule {}
