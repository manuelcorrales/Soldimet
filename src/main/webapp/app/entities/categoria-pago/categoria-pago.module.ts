import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    CategoriaPagoComponent,
    CategoriaPagoDetailComponent,
    CategoriaPagoUpdateComponent,
    CategoriaPagoDeleteDialogComponent,
    CategoriaPagoDeletePopupComponent,
    categoriaPagoRoute,
    categoriaPagoPopupRoute
} from './';

const ENTITY_STATES = [...categoriaPagoRoute, ...categoriaPagoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CategoriaPagoComponent,
        CategoriaPagoDetailComponent,
        CategoriaPagoUpdateComponent,
        CategoriaPagoDeleteDialogComponent,
        CategoriaPagoDeletePopupComponent
    ],
    entryComponents: [CategoriaPagoComponent, CategoriaPagoUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetCategoriaPagoModule {}
