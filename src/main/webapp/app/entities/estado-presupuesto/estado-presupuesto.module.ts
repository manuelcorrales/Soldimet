import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { EstadoPresupuestoComponent } from './estado-presupuesto.component';
import { EstadoPresupuestoDetailComponent } from './estado-presupuesto-detail.component';
import { EstadoPresupuestoUpdateComponent } from './estado-presupuesto-update.component';
import {
  EstadoPresupuestoDeletePopupComponent,
  EstadoPresupuestoDeleteDialogComponent
} from './estado-presupuesto-delete-dialog.component';
import { estadoPresupuestoRoute, estadoPresupuestoPopupRoute } from './estado-presupuesto.route';

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
