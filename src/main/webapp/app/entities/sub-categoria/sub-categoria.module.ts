import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    SubCategoriaComponent,
    SubCategoriaDetailComponent,
    SubCategoriaUpdateComponent,
    subCategoriaRoute,
    SubCategoriaDeletePopupComponent,
    subCategoriaPopupRoute
} from 'app/entities/sub-categoria';

const ENTITY_STATES = [...subCategoriaRoute, ...subCategoriaPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [SubCategoriaComponent, SubCategoriaDetailComponent, SubCategoriaDeletePopupComponent, SubCategoriaUpdateComponent],
    entryComponents: [SubCategoriaComponent, SubCategoriaUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetSubCategoriaModule {}
