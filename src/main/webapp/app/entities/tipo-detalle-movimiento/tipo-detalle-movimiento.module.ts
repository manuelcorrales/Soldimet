import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TipoDetalleMovimientoComponent } from './list/tipo-detalle-movimiento.component';
import { TipoDetalleMovimientoDetailComponent } from './detail/tipo-detalle-movimiento-detail.component';
import { TipoDetalleMovimientoUpdateComponent } from './update/tipo-detalle-movimiento-update.component';
import { TipoDetalleMovimientoDeleteDialogComponent } from './delete/tipo-detalle-movimiento-delete-dialog.component';
import { TipoDetalleMovimientoRoutingModule } from './route/tipo-detalle-movimiento-routing.module';

@NgModule({
  imports: [SharedModule, TipoDetalleMovimientoRoutingModule],
  declarations: [
    TipoDetalleMovimientoComponent,
    TipoDetalleMovimientoDetailComponent,
    TipoDetalleMovimientoUpdateComponent,
    TipoDetalleMovimientoDeleteDialogComponent,
  ],
  entryComponents: [TipoDetalleMovimientoDeleteDialogComponent],
})
export class TipoDetalleMovimientoModule {}
