import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    SubCategoriaService,
    SubCategoriaPopupService,
    SubCategoriaComponent,
    SubCategoriaDetailComponent,
    SubCategoriaDialogComponent,
    SubCategoriaPopupComponent,
    SubCategoriaDeletePopupComponent,
    SubCategoriaDeleteDialogComponent,
    subCategoriaRoute,
    subCategoriaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...subCategoriaRoute,
    ...subCategoriaPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SubCategoriaComponent,
        SubCategoriaDetailComponent,
        SubCategoriaDialogComponent,
        SubCategoriaDeleteDialogComponent,
        SubCategoriaPopupComponent,
        SubCategoriaDeletePopupComponent,
    ],
    entryComponents: [
        SubCategoriaComponent,
        SubCategoriaDialogComponent,
        SubCategoriaPopupComponent,
        SubCategoriaDeleteDialogComponent,
        SubCategoriaDeletePopupComponent,
    ],
    providers: [
        SubCategoriaService,
        SubCategoriaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetSubCategoriaModule {}
