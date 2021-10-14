import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TipoMovimientoComponent } from './list/tipo-movimiento.component';
import { TipoMovimientoDetailComponent } from './detail/tipo-movimiento-detail.component';
import { TipoMovimientoUpdateComponent } from './update/tipo-movimiento-update.component';
import { TipoMovimientoDeleteDialogComponent } from './delete/tipo-movimiento-delete-dialog.component';
import { TipoMovimientoRoutingModule } from './route/tipo-movimiento-routing.module';

@NgModule({
  imports: [SharedModule, TipoMovimientoRoutingModule],
  declarations: [
    TipoMovimientoComponent,
    TipoMovimientoDetailComponent,
    TipoMovimientoUpdateComponent,
    TipoMovimientoDeleteDialogComponent,
  ],
  entryComponents: [TipoMovimientoDeleteDialogComponent],
})
export class TipoMovimientoModule {}
