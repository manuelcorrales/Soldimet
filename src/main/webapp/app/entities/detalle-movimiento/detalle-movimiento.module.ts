import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DetalleMovimientoComponent } from './list/detalle-movimiento.component';
import { DetalleMovimientoDetailComponent } from './detail/detalle-movimiento-detail.component';
import { DetalleMovimientoUpdateComponent } from './update/detalle-movimiento-update.component';
import { DetalleMovimientoDeleteDialogComponent } from './delete/detalle-movimiento-delete-dialog.component';
import { DetalleMovimientoRoutingModule } from './route/detalle-movimiento-routing.module';

@NgModule({
  imports: [SharedModule, DetalleMovimientoRoutingModule],
  declarations: [
    DetalleMovimientoComponent,
    DetalleMovimientoDetailComponent,
    DetalleMovimientoUpdateComponent,
    DetalleMovimientoDeleteDialogComponent,
  ],
  entryComponents: [DetalleMovimientoDeleteDialogComponent],
})
export class DetalleMovimientoModule {}
