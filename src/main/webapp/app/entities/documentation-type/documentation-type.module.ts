import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { DocumentationTypeComponent } from './documentation-type.component';
import { DocumentationTypeDetailComponent } from './documentation-type-detail.component';
import { DocumentationTypeUpdateComponent } from './documentation-type-update.component';
import {
  DocumentationTypeDeletePopupComponent,
  DocumentationTypeDeleteDialogComponent
} from './documentation-type-delete-dialog.component';
import { documentationTypeRoute, documentationTypePopupRoute } from './documentation-type.route';

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
  ]
})
export class SoldimetDocumentationTypeModule {}
