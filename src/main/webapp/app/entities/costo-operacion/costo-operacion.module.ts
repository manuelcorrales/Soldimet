import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    CostoOperacionComponent,
    CostoOperacionDetailComponent,
    CostoOperacionUpdateComponent,
    CostoOperacionDeletePopupComponent,
    costoOperacionRoute,
    costoOperacionPopupRoute,
    CostoOperacionDeleteDialogComponent
} from './';

const ENTITY_STATES = [...costoOperacionRoute, ...costoOperacionPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CostoOperacionComponent,
        CostoOperacionDetailComponent,
        CostoOperacionUpdateComponent,
        CostoOperacionDeletePopupComponent,
        CostoOperacionDeleteDialogComponent
    ],
    entryComponents: [CostoOperacionComponent, CostoOperacionUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetCostoOperacionModule {}
