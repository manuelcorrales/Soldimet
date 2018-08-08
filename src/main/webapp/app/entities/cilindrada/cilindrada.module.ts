import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    CilindradaComponent,
    CilindradaDetailComponent,
    CilindradaUpdateComponent,
    CilindradaDeletePopupComponent,
    CilindradaDeleteDialogComponent,
    cilindradaRoute,
    cilindradaPopupRoute
} from './';

const ENTITY_STATES = [...cilindradaRoute, ...cilindradaPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CilindradaComponent,
        CilindradaDetailComponent,
        CilindradaUpdateComponent,
        CilindradaDeleteDialogComponent,
        CilindradaDeletePopupComponent
    ],
    entryComponents: [CilindradaComponent, CilindradaUpdateComponent, CilindradaDeleteDialogComponent, CilindradaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetCilindradaModule {}
