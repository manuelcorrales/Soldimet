import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    DocumentationTypeComponent,
    DocumentationTypeDetailComponent,
    DocumentationTypeUpdateComponent,
    DocumentationTypeDeletePopupComponent,
    DocumentationTypeDeleteDialogComponent,
    documentationTypeRoute,
    documentationTypePopupRoute
} from './';

const ENTITY_STATES = [...documentationTypeRoute, ...documentationTypePopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DocumentationTypeComponent,
        DocumentationTypeDetailComponent,
        DocumentationTypeUpdateComponent,
        DocumentationTypeDeleteDialogComponent,
        DocumentationTypeDeletePopupComponent
    ],
    entryComponents: [
        DocumentationTypeComponent,
        DocumentationTypeUpdateComponent,
        DocumentationTypeDeleteDialogComponent,
        DocumentationTypeDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetDocumentationTypeModule {}
