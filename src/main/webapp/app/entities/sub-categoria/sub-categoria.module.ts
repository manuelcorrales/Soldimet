import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { SubCategoriaComponent } from 'app/entities/sub-categoria/sub-categoria.component';
import { SubCategoriaDetailComponent } from 'app/entities/sub-categoria/sub-categoria-detail.component';
import { SubCategoriaUpdateComponent } from 'app/entities/sub-categoria/sub-categoria-update.component';
import {
  SubCategoriaDeletePopupComponent,
  SubCategoriaDeleteDialogComponent
} from 'app/entities/sub-categoria/sub-categoria-delete-dialog.component';
import { subCategoriaRoute, subCategoriaPopupRoute } from 'app/entities/sub-categoria/sub-categoria.route';

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
  entryComponents: [SubCategoriaComponent, SubCategoriaUpdateComponent, SubCategoriaDeleteDialogComponent, SubCategoriaDeletePopupComponent]
})
export class SoldimetSubCategoriaModule {}
