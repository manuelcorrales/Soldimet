import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { BancoComponent } from 'app/entities/banco/banco.component';
import { BancoDetailComponent } from 'app/entities/banco/banco-detail.component';
import { BancoUpdateComponent } from 'app/entities/banco/banco-update.component';
import { BancoDeletePopupComponent, BancoDeleteDialogComponent } from 'app/entities/banco/banco-delete-dialog.component';
import { bancoRoute, bancoPopupRoute } from 'app/entities/banco/banco.route';

const ENTITY_STATES = [...bancoRoute, ...bancoPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [BancoComponent, BancoDetailComponent, BancoUpdateComponent, BancoDeleteDialogComponent, BancoDeletePopupComponent],
  entryComponents: [BancoComponent, BancoUpdateComponent, BancoDeleteDialogComponent, BancoDeletePopupComponent]
})
export class SoldimetBancoModule {}
