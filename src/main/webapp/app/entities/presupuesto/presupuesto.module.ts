import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { PresupuestoComponent } from './presupuesto.component';
import { PresupuestoDetailComponent } from './presupuesto-detail.component';
import { PresupuestoUpdateComponent } from './presupuesto-update.component';
import { PresupuestoDeletePopupComponent, PresupuestoDeleteDialogComponent } from './presupuesto-delete-dialog.component';
import { presupuestoRoute, presupuestoPopupRoute } from './presupuesto.route';

const ENTITY_STATES = [...presupuestoRoute, ...presupuestoPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PresupuestoComponent,
    PresupuestoDetailComponent,
    PresupuestoUpdateComponent,
    PresupuestoDeleteDialogComponent,
    PresupuestoDeletePopupComponent
  ],
  entryComponents: [PresupuestoComponent, PresupuestoUpdateComponent, PresupuestoDeleteDialogComponent, PresupuestoDeletePopupComponent]
})
export class SoldimetPresupuestoModule {}
