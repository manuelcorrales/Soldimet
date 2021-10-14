import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MovimientoPresupuestoComponent } from './list/movimiento-presupuesto.component';
import { MovimientoPresupuestoDetailComponent } from './detail/movimiento-presupuesto-detail.component';
import { MovimientoPresupuestoUpdateComponent } from './update/movimiento-presupuesto-update.component';
import { MovimientoPresupuestoDeleteDialogComponent } from './delete/movimiento-presupuesto-delete-dialog.component';
import { MovimientoPresupuestoRoutingModule } from './route/movimiento-presupuesto-routing.module';

@NgModule({
  imports: [SharedModule, MovimientoPresupuestoRoutingModule],
  declarations: [
    MovimientoPresupuestoComponent,
    MovimientoPresupuestoDetailComponent,
    MovimientoPresupuestoUpdateComponent,
    MovimientoPresupuestoDeleteDialogComponent,
  ],
  entryComponents: [MovimientoPresupuestoDeleteDialogComponent],
})
export class MovimientoPresupuestoModule {}
