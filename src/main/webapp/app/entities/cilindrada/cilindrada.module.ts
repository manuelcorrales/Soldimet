import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    CilindradaService,
    CilindradaPopupService,
    CilindradaComponent,
    CilindradaDetailComponent,
    CilindradaDialogComponent,
    CilindradaPopupComponent,
    CilindradaDeletePopupComponent,
    CilindradaDeleteDialogComponent,
    cilindradaRoute,
    cilindradaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cilindradaRoute,
    ...cilindradaPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CilindradaComponent,
        CilindradaDetailComponent,
        CilindradaDialogComponent,
        CilindradaDeleteDialogComponent,
        CilindradaPopupComponent,
        CilindradaDeletePopupComponent,
    ],
    entryComponents: [
        CilindradaComponent,
        CilindradaDialogComponent,
        CilindradaPopupComponent,
        CilindradaDeleteDialogComponent,
        CilindradaDeletePopupComponent,
    ],
    providers: [
        CilindradaService,
        CilindradaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetCilindradaModule {}
