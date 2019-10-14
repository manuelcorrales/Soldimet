import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { SubCategoriaComponent } from './sub-categoria.component';
import { SubCategoriaDetailComponent } from './sub-categoria-detail.component';
import { SubCategoriaUpdateComponent } from './sub-categoria-update.component';
import { SubCategoriaDeletePopupComponent, SubCategoriaDeleteDialogComponent } from './sub-categoria-delete-dialog.component';
import { subCategoriaRoute, subCategoriaPopupRoute } from './sub-categoria.route';

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
