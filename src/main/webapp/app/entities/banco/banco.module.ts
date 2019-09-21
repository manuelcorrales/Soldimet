import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { BancoComponent } from './banco.component';
import { BancoDetailComponent } from './banco-detail.component';
import { BancoUpdateComponent } from './banco-update.component';
import { BancoDeletePopupComponent, BancoDeleteDialogComponent } from './banco-delete-dialog.component';
import { bancoRoute, bancoPopupRoute } from './banco.route';

const ENTITY_STATES = [...bancoRoute, ...bancoPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [BancoComponent, BancoDetailComponent, BancoUpdateComponent, BancoDeleteDialogComponent, BancoDeletePopupComponent],
  entryComponents: [BancoComponent, BancoUpdateComponent, BancoDeleteDialogComponent, BancoDeletePopupComponent]
})
export class SoldimetBancoModule {}
