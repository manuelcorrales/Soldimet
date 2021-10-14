import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EstadoPedidoRepuestoComponent } from './list/estado-pedido-repuesto.component';
import { EstadoPedidoRepuestoDetailComponent } from './detail/estado-pedido-repuesto-detail.component';
import { EstadoPedidoRepuestoUpdateComponent } from './update/estado-pedido-repuesto-update.component';
import { EstadoPedidoRepuestoDeleteDialogComponent } from './delete/estado-pedido-repuesto-delete-dialog.component';
import { EstadoPedidoRepuestoRoutingModule } from './route/estado-pedido-repuesto-routing.module';

@NgModule({
  imports: [SharedModule, EstadoPedidoRepuestoRoutingModule],
  declarations: [
    EstadoPedidoRepuestoComponent,
    EstadoPedidoRepuestoDetailComponent,
    EstadoPedidoRepuestoUpdateComponent,
    EstadoPedidoRepuestoDeleteDialogComponent,
  ],
  entryComponents: [EstadoPedidoRepuestoDeleteDialogComponent],
})
export class EstadoPedidoRepuestoModule {}
