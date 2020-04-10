import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { EstadoPedidoRepuestoComponent } from 'app/entities/estado-pedido-repuesto/estado-pedido-repuesto.component';
import { EstadoPedidoRepuestoDetailComponent } from 'app/entities/estado-pedido-repuesto/estado-pedido-repuesto-detail.component';
import { EstadoPedidoRepuestoUpdateComponent } from 'app/entities/estado-pedido-repuesto/estado-pedido-repuesto-update.component';
import {
  EstadoPedidoRepuestoDeletePopupComponent,
  EstadoPedidoRepuestoDeleteDialogComponent
} from 'app/entities/estado-pedido-repuesto/estado-pedido-repuesto-delete-dialog.component';
import {
  estadoPedidoRepuestoRoute,
  estadoPedidoRepuestoPopupRoute
} from 'app/entities/estado-pedido-repuesto/estado-pedido-repuesto.route';

const ENTITY_STATES = [...estadoPedidoRepuestoRoute, ...estadoPedidoRepuestoPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EstadoPedidoRepuestoComponent,
    EstadoPedidoRepuestoDetailComponent,
    EstadoPedidoRepuestoUpdateComponent,
    EstadoPedidoRepuestoDeleteDialogComponent,
    EstadoPedidoRepuestoDeletePopupComponent
  ],
  entryComponents: [
    EstadoPedidoRepuestoComponent,
    EstadoPedidoRepuestoUpdateComponent,
    EstadoPedidoRepuestoDeleteDialogComponent,
    EstadoPedidoRepuestoDeletePopupComponent
  ]
})
export class SoldimetEstadoPedidoRepuestoModule {}
