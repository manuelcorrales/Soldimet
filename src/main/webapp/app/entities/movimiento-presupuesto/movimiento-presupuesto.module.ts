import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { MovimientoPresupuestoComponent } from './movimiento-presupuesto.component';
import { MovimientoPresupuestoDetailComponent } from './movimiento-presupuesto-detail.component';
import { MovimientoPresupuestoUpdateComponent } from './movimiento-presupuesto-update.component';
import {
  MovimientoPresupuestoDeletePopupComponent,
  MovimientoPresupuestoDeleteDialogComponent
} from './movimiento-presupuesto-delete-dialog.component';
import { movimientoPresupuestoRoute, movimientoPresupuestoPopupRoute } from './movimiento-presupuesto.route';

const ENTITY_STATES = [...movimientoPresupuestoRoute, ...movimientoPresupuestoPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MovimientoPresupuestoComponent,
    MovimientoPresupuestoDetailComponent,
    MovimientoPresupuestoUpdateComponent,
    MovimientoPresupuestoDeleteDialogComponent,
    MovimientoPresupuestoDeletePopupComponent
  ],
  entryComponents: [
    MovimientoPresupuestoComponent,
    MovimientoPresupuestoUpdateComponent,
    MovimientoPresupuestoDeleteDialogComponent,
    MovimientoPresupuestoDeletePopupComponent
  ]
})
export class SoldimetMovimientoPresupuestoModule {}
