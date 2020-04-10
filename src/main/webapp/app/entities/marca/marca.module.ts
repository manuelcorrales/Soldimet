import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { MarcaComponent } from 'app/entities/marca/marca.component';
import { MarcaDetailComponent } from 'app/entities/marca/marca-detail.component';
import { MarcaUpdateComponent } from 'app/entities/marca/marca-update.component';
import { MarcaDeletePopupComponent, MarcaDeleteDialogComponent } from 'app/entities/marca/marca-delete-dialog.component';
import { marcaRoute, marcaPopupRoute } from 'app/entities/marca/marca.route';

const ENTITY_STATES = [...marcaRoute, ...marcaPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [MarcaComponent, MarcaDetailComponent, MarcaUpdateComponent, MarcaDeleteDialogComponent, MarcaDeletePopupComponent],
  entryComponents: [MarcaComponent, MarcaUpdateComponent, MarcaDeleteDialogComponent, MarcaDeletePopupComponent]
})
export class SoldimetMarcaModule {}
