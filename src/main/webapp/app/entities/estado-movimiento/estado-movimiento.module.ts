import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EstadoMovimientoComponent } from './list/estado-movimiento.component';
import { EstadoMovimientoDetailComponent } from './detail/estado-movimiento-detail.component';
import { EstadoMovimientoUpdateComponent } from './update/estado-movimiento-update.component';
import { EstadoMovimientoDeleteDialogComponent } from './delete/estado-movimiento-delete-dialog.component';
import { EstadoMovimientoRoutingModule } from './route/estado-movimiento-routing.module';

@NgModule({
  imports: [SharedModule, EstadoMovimientoRoutingModule],
  declarations: [
    EstadoMovimientoComponent,
    EstadoMovimientoDetailComponent,
    EstadoMovimientoUpdateComponent,
    EstadoMovimientoDeleteDialogComponent,
  ],
  entryComponents: [EstadoMovimientoDeleteDialogComponent],
})
export class EstadoMovimientoModule {}
