import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DocumentationTypeComponent } from './list/documentation-type.component';
import { DocumentationTypeDetailComponent } from './detail/documentation-type-detail.component';
import { DocumentationTypeUpdateComponent } from './update/documentation-type-update.component';
import { DocumentationTypeDeleteDialogComponent } from './delete/documentation-type-delete-dialog.component';
import { DocumentationTypeRoutingModule } from './route/documentation-type-routing.module';

@NgModule({
  imports: [SharedModule, DocumentationTypeRoutingModule],
  declarations: [
    DocumentationTypeComponent,
    DocumentationTypeDetailComponent,
    DocumentationTypeUpdateComponent,
    DocumentationTypeDeleteDialogComponent,
  ],
  entryComponents: [DocumentationTypeDeleteDialogComponent],
})
export class DocumentationTypeModule {}
