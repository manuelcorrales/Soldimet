import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { DetallePresupuestoComponent } from 'app/entities/detalle-presupuesto/detalle-presupuesto.component';
import { DetallePresupuestoDetailComponent } from 'app/entities/detalle-presupuesto/detalle-presupuesto-detail.component';
import { DetallePresupuestoUpdateComponent } from 'app/entities/detalle-presupuesto/detalle-presupuesto-update.component';
import {
  DetallePresupuestoDeletePopupComponent,
  DetallePresupuestoDeleteDialogComponent
} from 'app/entities/detalle-presupuesto/detalle-presupuesto-delete-dialog.component';
import { detallePresupuestoRoute, detallePresupuestoPopupRoute } from 'app/entities/detalle-presupuesto/detalle-presupuesto.route';

const ENTITY_STATES = [...detallePresupuestoRoute, ...detallePresupuestoPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DetallePresupuestoComponent,
    DetallePresupuestoDetailComponent,
    DetallePresupuestoUpdateComponent,
    DetallePresupuestoDeleteDialogComponent,
    DetallePresupuestoDeletePopupComponent
  ],
  entryComponents: [
    DetallePresupuestoComponent,
    DetallePresupuestoUpdateComponent,
    DetallePresupuestoDeleteDialogComponent,
    DetallePresupuestoDeletePopupComponent
  ]
})
export class SoldimetDetallePresupuestoModule {}
