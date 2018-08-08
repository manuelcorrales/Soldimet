import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    SubCategoriaComponent,
    SubCategoriaDetailComponent,
    SubCategoriaUpdateComponent,
    SubCategoriaDeletePopupComponent,
    SubCategoriaDeleteDialogComponent,
    subCategoriaRoute,
    subCategoriaPopupRoute
} from './';

const ENTITY_STATES = [...subCategoriaRoute, ...subCategoriaPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SubCategoriaComponent,
        SubCategoriaDetailComponent,
        SubCategoriaUpdateComponent,
        SubCategoriaDeleteDialogComponent,
        SubCategoriaDeletePopupComponent
    ],
    entryComponents: [
        SubCategoriaComponent,
        SubCategoriaUpdateComponent,
        SubCategoriaDeleteDialogComponent,
        SubCategoriaDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetSubCategoriaModule {}
