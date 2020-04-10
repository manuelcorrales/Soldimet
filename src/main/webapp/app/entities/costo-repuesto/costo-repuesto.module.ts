import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { CostoRepuestoComponent } from 'app/entities/costo-repuesto/costo-repuesto.component';
import { CostoRepuestoDetailComponent } from 'app/entities/costo-repuesto/costo-repuesto-detail.component';
import { CostoRepuestoUpdateComponent } from 'app/entities/costo-repuesto/costo-repuesto-update.component';
import {
  CostoRepuestoDeletePopupComponent,
  CostoRepuestoDeleteDialogComponent
} from 'app/entities/costo-repuesto/costo-repuesto-delete-dialog.component';
import { costoRepuestoRoute, costoRepuestoPopupRoute } from 'app/entities/costo-repuesto/costo-repuesto.route';

const ENTITY_STATES = [...costoRepuestoRoute, ...costoRepuestoPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CostoRepuestoComponent,
    CostoRepuestoDetailComponent,
    CostoRepuestoUpdateComponent,
    CostoRepuestoDeleteDialogComponent,
    CostoRepuestoDeletePopupComponent
  ],
  entryComponents: [
    CostoRepuestoComponent,
    CostoRepuestoUpdateComponent,
    CostoRepuestoDeleteDialogComponent,
    CostoRepuestoDeletePopupComponent
  ]
})
export class SoldimetCostoRepuestoModule {}
