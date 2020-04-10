import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { EstadoPresupuestoComponent } from 'app/entities/estado-presupuesto/estado-presupuesto.component';
import { EstadoPresupuestoDetailComponent } from 'app/entities/estado-presupuesto/estado-presupuesto-detail.component';
import { EstadoPresupuestoUpdateComponent } from 'app/entities/estado-presupuesto/estado-presupuesto-update.component';
import {
  EstadoPresupuestoDeletePopupComponent,
  EstadoPresupuestoDeleteDialogComponent
} from 'app/entities/estado-presupuesto/estado-presupuesto-delete-dialog.component';
import { estadoPresupuestoRoute, estadoPresupuestoPopupRoute } from 'app/entities/estado-presupuesto/estado-presupuesto.route';

const ENTITY_STATES = [...estadoPresupuestoRoute, ...estadoPresupuestoPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EstadoPresupuestoComponent,
    EstadoPresupuestoDetailComponent,
    EstadoPresupuestoUpdateComponent,
    EstadoPresupuestoDeleteDialogComponent,
    EstadoPresupuestoDeletePopupComponent
  ],
  entryComponents: [
    EstadoPresupuestoComponent,
    EstadoPresupuestoUpdateComponent,
    EstadoPresupuestoDeleteDialogComponent,
    EstadoPresupuestoDeletePopupComponent
  ]
})
export class SoldimetEstadoPresupuestoModule {}
