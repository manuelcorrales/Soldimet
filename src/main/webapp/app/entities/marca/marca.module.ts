import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { MarcaComponent } from './marca.component';
import { MarcaDetailComponent } from './marca-detail.component';
import { MarcaUpdateComponent } from './marca-update.component';
import { MarcaDeletePopupComponent, MarcaDeleteDialogComponent } from './marca-delete-dialog.component';
import { marcaRoute, marcaPopupRoute } from './marca.route';

const ENTITY_STATES = [...marcaRoute, ...marcaPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [MarcaComponent, MarcaDetailComponent, MarcaUpdateComponent, MarcaDeleteDialogComponent, MarcaDeletePopupComponent],
  entryComponents: [MarcaComponent, MarcaUpdateComponent, MarcaDeleteDialogComponent, MarcaDeletePopupComponent]
})
export class SoldimetMarcaModule {}
