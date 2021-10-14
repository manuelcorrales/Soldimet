import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DetallMovimientoComponent } from './list/detall-movimiento.component';
import { DetallMovimientoDetailComponent } from './detail/detall-movimiento-detail.component';
import { DetallMovimientoUpdateComponent } from './update/detall-movimiento-update.component';
import { DetallMovimientoDeleteDialogComponent } from './delete/detall-movimiento-delete-dialog.component';
import { DetallMovimientoRoutingModule } from './route/detall-movimiento-routing.module';

@NgModule({
  imports: [SharedModule, DetallMovimientoRoutingModule],
  declarations: [
    DetallMovimientoComponent,
    DetallMovimientoDetailComponent,
    DetallMovimientoUpdateComponent,
    DetallMovimientoDeleteDialogComponent,
  ],
  entryComponents: [DetallMovimientoDeleteDialogComponent],
})
export class DetallMovimientoModule {}
