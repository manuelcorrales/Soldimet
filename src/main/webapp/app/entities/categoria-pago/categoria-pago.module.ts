import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    CategoriaPagoService,
    CategoriaPagoPopupService,
    CategoriaPagoComponent,
    CategoriaPagoDetailComponent,
    CategoriaPagoDialogComponent,
    CategoriaPagoPopupComponent,
    CategoriaPagoDeletePopupComponent,
    CategoriaPagoDeleteDialogComponent,
    categoriaPagoRoute,
    categoriaPagoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...categoriaPagoRoute,
    ...categoriaPagoPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CategoriaPagoComponent,
        CategoriaPagoDetailComponent,
        CategoriaPagoDialogComponent,
        CategoriaPagoDeleteDialogComponent,
        CategoriaPagoPopupComponent,
        CategoriaPagoDeletePopupComponent,
    ],
    entryComponents: [
        CategoriaPagoComponent,
        CategoriaPagoDialogComponent,
        CategoriaPagoPopupComponent,
        CategoriaPagoDeleteDialogComponent,
        CategoriaPagoDeletePopupComponent,
    ],
    providers: [
        CategoriaPagoService,
        CategoriaPagoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetCategoriaPagoModule {}
