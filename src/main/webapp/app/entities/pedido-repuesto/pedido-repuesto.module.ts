import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PedidoRepuestoComponent } from './list/pedido-repuesto.component';
import { PedidoRepuestoDetailComponent } from './detail/pedido-repuesto-detail.component';
import { PedidoRepuestoUpdateComponent } from './update/pedido-repuesto-update.component';
import { PedidoRepuestoDeleteDialogComponent } from './delete/pedido-repuesto-delete-dialog.component';
import { PedidoRepuestoRoutingModule } from './route/pedido-repuesto-routing.module';

@NgModule({
  imports: [SharedModule, PedidoRepuestoRoutingModule],
  declarations: [
    PedidoRepuestoComponent,
    PedidoRepuestoDetailComponent,
    PedidoRepuestoUpdateComponent,
    PedidoRepuestoDeleteDialogComponent,
  ],
  entryComponents: [PedidoRepuestoDeleteDialogComponent],
})
export class PedidoRepuestoModule {}
