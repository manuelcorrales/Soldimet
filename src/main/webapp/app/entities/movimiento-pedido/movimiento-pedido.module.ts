import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MovimientoPedidoComponent } from './list/movimiento-pedido.component';
import { MovimientoPedidoDetailComponent } from './detail/movimiento-pedido-detail.component';
import { MovimientoPedidoUpdateComponent } from './update/movimiento-pedido-update.component';
import { MovimientoPedidoDeleteDialogComponent } from './delete/movimiento-pedido-delete-dialog.component';
import { MovimientoPedidoRoutingModule } from './route/movimiento-pedido-routing.module';

@NgModule({
  imports: [SharedModule, MovimientoPedidoRoutingModule],
  declarations: [
    MovimientoPedidoComponent,
    MovimientoPedidoDetailComponent,
    MovimientoPedidoUpdateComponent,
    MovimientoPedidoDeleteDialogComponent,
  ],
  entryComponents: [MovimientoPedidoDeleteDialogComponent],
})
export class MovimientoPedidoModule {}
