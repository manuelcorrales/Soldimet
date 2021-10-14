import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DetallePresupuestoComponent } from './list/detalle-presupuesto.component';
import { DetallePresupuestoDetailComponent } from './detail/detalle-presupuesto-detail.component';
import { DetallePresupuestoUpdateComponent } from './update/detalle-presupuesto-update.component';
import { DetallePresupuestoDeleteDialogComponent } from './delete/detalle-presupuesto-delete-dialog.component';
import { DetallePresupuestoRoutingModule } from './route/detalle-presupuesto-routing.module';

@NgModule({
  imports: [SharedModule, DetallePresupuestoRoutingModule],
  declarations: [
    DetallePresupuestoComponent,
    DetallePresupuestoDetailComponent,
    DetallePresupuestoUpdateComponent,
    DetallePresupuestoDeleteDialogComponent,
  ],
  entryComponents: [DetallePresupuestoDeleteDialogComponent],
})
export class DetallePresupuestoModule {}
