import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PresupuestoComponent } from './list/presupuesto.component';
import { PresupuestoDetailComponent } from './detail/presupuesto-detail.component';
import { PresupuestoUpdateComponent } from './update/presupuesto-update.component';
import { PresupuestoDeleteDialogComponent } from './delete/presupuesto-delete-dialog.component';
import { PresupuestoRoutingModule } from './route/presupuesto-routing.module';

@NgModule({
  imports: [SharedModule, PresupuestoRoutingModule],
  declarations: [PresupuestoComponent, PresupuestoDetailComponent, PresupuestoUpdateComponent, PresupuestoDeleteDialogComponent],
  entryComponents: [PresupuestoDeleteDialogComponent],
})
export class PresupuestoModule {}
