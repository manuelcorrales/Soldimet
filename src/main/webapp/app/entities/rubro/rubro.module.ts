import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { RubroComponent } from './rubro.component';
import { RubroDetailComponent } from './rubro-detail.component';
import { RubroUpdateComponent } from './rubro-update.component';
import { RubroDeletePopupComponent, RubroDeleteDialogComponent } from './rubro-delete-dialog.component';
import { rubroRoute, rubroPopupRoute } from './rubro.route';

const ENTITY_STATES = [...rubroRoute, ...rubroPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [RubroComponent, RubroDetailComponent, RubroUpdateComponent, RubroDeleteDialogComponent, RubroDeletePopupComponent],
  entryComponents: [RubroComponent, RubroUpdateComponent, RubroDeleteDialogComponent, RubroDeletePopupComponent]
})
export class SoldimetRubroModule {}
