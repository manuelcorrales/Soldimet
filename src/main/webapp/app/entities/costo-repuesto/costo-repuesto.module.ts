import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { CostoRepuestoComponent } from './costo-repuesto.component';
import { CostoRepuestoDetailComponent } from './costo-repuesto-detail.component';
import { CostoRepuestoUpdateComponent } from './costo-repuesto-update.component';
import { CostoRepuestoDeletePopupComponent, CostoRepuestoDeleteDialogComponent } from './costo-repuesto-delete-dialog.component';
import { costoRepuestoRoute, costoRepuestoPopupRoute } from './costo-repuesto.route';

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
