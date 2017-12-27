import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    CostoOperacionService,
    CostoOperacionPopupService,
    CostoOperacionComponent,
    CostoOperacionDetailComponent,
    CostoOperacionDialogComponent,
    CostoOperacionPopupComponent,
    CostoOperacionDeletePopupComponent,
    CostoOperacionDeleteDialogComponent,
    costoOperacionRoute,
    costoOperacionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...costoOperacionRoute,
    ...costoOperacionPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CostoOperacionComponent,
        CostoOperacionDetailComponent,
        CostoOperacionDialogComponent,
        CostoOperacionDeleteDialogComponent,
        CostoOperacionPopupComponent,
        CostoOperacionDeletePopupComponent,
    ],
    entryComponents: [
        CostoOperacionComponent,
        CostoOperacionDialogComponent,
        CostoOperacionPopupComponent,
        CostoOperacionDeleteDialogComponent,
        CostoOperacionDeletePopupComponent,
    ],
    providers: [
        CostoOperacionService,
        CostoOperacionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetCostoOperacionModule {}
