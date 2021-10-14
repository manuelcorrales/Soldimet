import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EstadoDetallePedidoComponent } from './list/estado-detalle-pedido.component';
import { EstadoDetallePedidoDetailComponent } from './detail/estado-detalle-pedido-detail.component';
import { EstadoDetallePedidoUpdateComponent } from './update/estado-detalle-pedido-update.component';
import { EstadoDetallePedidoDeleteDialogComponent } from './delete/estado-detalle-pedido-delete-dialog.component';
import { EstadoDetallePedidoRoutingModule } from './route/estado-detalle-pedido-routing.module';

@NgModule({
  imports: [SharedModule, EstadoDetallePedidoRoutingModule],
  declarations: [
    EstadoDetallePedidoComponent,
    EstadoDetallePedidoDetailComponent,
    EstadoDetallePedidoUpdateComponent,
    EstadoDetallePedidoDeleteDialogComponent,
  ],
  entryComponents: [EstadoDetallePedidoDeleteDialogComponent],
})
export class EstadoDetallePedidoModule {}
