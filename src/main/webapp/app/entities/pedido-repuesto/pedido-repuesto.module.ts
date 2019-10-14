import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { PedidoRepuestoComponent } from './pedido-repuesto.component';
import { PedidoRepuestoDetailComponent } from './pedido-repuesto-detail.component';
import { PedidoRepuestoUpdateComponent } from './pedido-repuesto-update.component';
import { PedidoRepuestoDeletePopupComponent, PedidoRepuestoDeleteDialogComponent } from './pedido-repuesto-delete-dialog.component';
import { pedidoRepuestoRoute, pedidoRepuestoPopupRoute } from './pedido-repuesto.route';

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
