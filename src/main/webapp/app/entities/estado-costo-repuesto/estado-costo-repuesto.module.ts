import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { EstadoCostoRepuestoComponent } from 'app/entities/estado-costo-repuesto/estado-costo-repuesto.component';
import { EstadoCostoRepuestoDetailComponent } from 'app/entities/estado-costo-repuesto/estado-costo-repuesto-detail.component';
import { EstadoCostoRepuestoUpdateComponent } from 'app/entities/estado-costo-repuesto/estado-costo-repuesto-update.component';
import {
  EstadoCostoRepuestoDeletePopupComponent,
  EstadoCostoRepuestoDeleteDialogComponent
} from 'app/entities/estado-costo-repuesto/estado-costo-repuesto-delete-dialog.component';
import { estadoCostoRepuestoRoute, estadoCostoRepuestoPopupRoute } from 'app/entities/estado-costo-repuesto/estado-costo-repuesto.route';

const ENTITY_STATES = [...estadoCostoRepuestoRoute, ...estadoCostoRepuestoPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EstadoCostoRepuestoComponent,
    EstadoCostoRepuestoDetailComponent,
    EstadoCostoRepuestoUpdateComponent,
    EstadoCostoRepuestoDeleteDialogComponent,
    EstadoCostoRepuestoDeletePopupComponent
  ],
  entryComponents: [
    EstadoCostoRepuestoComponent,
    EstadoCostoRepuestoUpdateComponent,
    EstadoCostoRepuestoDeleteDialogComponent,
    EstadoCostoRepuestoDeletePopupComponent
  ]
})
export class SoldimetEstadoCostoRepuestoModule {}
