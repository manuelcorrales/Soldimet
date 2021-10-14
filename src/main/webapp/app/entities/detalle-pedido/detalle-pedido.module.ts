import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DetallePedidoComponent } from './list/detalle-pedido.component';
import { DetallePedidoDetailComponent } from './detail/detalle-pedido-detail.component';
import { DetallePedidoUpdateComponent } from './update/detalle-pedido-update.component';
import { DetallePedidoDeleteDialogComponent } from './delete/detalle-pedido-delete-dialog.component';
import { DetallePedidoRoutingModule } from './route/detalle-pedido-routing.module';

@NgModule({
  imports: [SharedModule, DetallePedidoRoutingModule],
  declarations: [DetallePedidoComponent, DetallePedidoDetailComponent, DetallePedidoUpdateComponent, DetallePedidoDeleteDialogComponent],
  entryComponents: [DetallePedidoDeleteDialogComponent],
})
export class DetallePedidoModule {}
