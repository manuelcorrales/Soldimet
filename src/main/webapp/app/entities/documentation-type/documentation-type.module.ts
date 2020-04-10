import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { DocumentationTypeComponent } from 'app/entities/documentation-type/documentation-type.component';
import { DocumentationTypeDetailComponent } from 'app/entities/documentation-type/documentation-type-detail.component';
import { DocumentationTypeUpdateComponent } from 'app/entities/documentation-type/documentation-type-update.component';
import {
  DocumentationTypeDeletePopupComponent,
  DocumentationTypeDeleteDialogComponent
} from 'app/entities/documentation-type/documentation-type-delete-dialog.component';
import { documentationTypeRoute, documentationTypePopupRoute } from 'app/entities/documentation-type/documentation-type.route';

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
