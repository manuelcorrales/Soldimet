import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { PedidoRepuestoComponent } from 'app/entities/pedido-repuesto/pedido-repuesto.component';
import { PedidoRepuestoDetailComponent } from 'app/entities/pedido-repuesto/pedido-repuesto-detail.component';
import { PedidoRepuestoUpdateComponent } from 'app/entities/pedido-repuesto/pedido-repuesto-update.component';
import {
  PedidoRepuestoDeletePopupComponent,
  PedidoRepuestoDeleteDialogComponent
} from 'app/entities/pedido-repuesto/pedido-repuesto-delete-dialog.component';
import { pedidoRepuestoRoute, pedidoRepuestoPopupRoute } from 'app/entities/pedido-repuesto/pedido-repuesto.route';

const ENTITY_STATES = [...pedidoRepuestoRoute, ...pedidoRepuestoPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PedidoRepuestoComponent,
    PedidoRepuestoDetailComponent,
    PedidoRepuestoUpdateComponent,
    PedidoRepuestoDeleteDialogComponent,
    PedidoRepuestoDeletePopupComponent
  ],
  entryComponents: [
    PedidoRepuestoComponent,
    PedidoRepuestoUpdateComponent,
    PedidoRepuestoDeleteDialogComponent,
    PedidoRepuestoDeletePopupComponent
  ]
})
export class SoldimetPedidoRepuestoModule {}
