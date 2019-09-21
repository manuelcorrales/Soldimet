import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { CostoOperacionComponent } from './costo-operacion.component';
import { CostoOperacionDetailComponent } from './costo-operacion-detail.component';
import { CostoOperacionUpdateComponent } from './costo-operacion-update.component';
import { CostoOperacionDeletePopupComponent, CostoOperacionDeleteDialogComponent } from './costo-operacion-delete-dialog.component';
import { costoOperacionRoute, costoOperacionPopupRoute } from './costo-operacion.route';

const ENTITY_STATES = [...costoOperacionRoute, ...costoOperacionPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CostoOperacionComponent,
    CostoOperacionDetailComponent,
    CostoOperacionUpdateComponent,
    CostoOperacionDeleteDialogComponent,
    CostoOperacionDeletePopupComponent
  ],
  entryComponents: [
    CostoOperacionComponent,
    CostoOperacionUpdateComponent,
    CostoOperacionDeleteDialogComponent,
    CostoOperacionDeletePopupComponent
  ]
})
export class SoldimetCostoOperacionModule {}
