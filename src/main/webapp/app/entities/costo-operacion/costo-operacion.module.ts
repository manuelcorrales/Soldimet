import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { CostoOperacionComponent } from 'app/entities/costo-operacion/costo-operacion.component';
import { CostoOperacionDetailComponent } from 'app/entities/costo-operacion/costo-operacion-detail.component';
import { CostoOperacionUpdateComponent } from 'app/entities/costo-operacion/costo-operacion-update.component';
import {
  CostoOperacionDeletePopupComponent,
  CostoOperacionDeleteDialogComponent
} from 'app/entities/costo-operacion/costo-operacion-delete-dialog.component';
import { costoOperacionRoute, costoOperacionPopupRoute } from 'app/entities/costo-operacion/costo-operacion.route';

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
