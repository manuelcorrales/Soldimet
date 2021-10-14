import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MovimientoArticuloComponent } from './list/movimiento-articulo.component';
import { MovimientoArticuloDetailComponent } from './detail/movimiento-articulo-detail.component';
import { MovimientoArticuloUpdateComponent } from './update/movimiento-articulo-update.component';
import { MovimientoArticuloDeleteDialogComponent } from './delete/movimiento-articulo-delete-dialog.component';
import { MovimientoArticuloRoutingModule } from './route/movimiento-articulo-routing.module';

@NgModule({
  imports: [SharedModule, MovimientoArticuloRoutingModule],
  declarations: [
    MovimientoArticuloComponent,
    MovimientoArticuloDetailComponent,
    MovimientoArticuloUpdateComponent,
    MovimientoArticuloDeleteDialogComponent,
  ],
  entryComponents: [MovimientoArticuloDeleteDialogComponent],
})
export class MovimientoArticuloModule {}
