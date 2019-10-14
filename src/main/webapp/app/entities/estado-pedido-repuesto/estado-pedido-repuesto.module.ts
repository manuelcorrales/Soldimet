import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { EstadoPedidoRepuestoComponent } from './estado-pedido-repuesto.component';
import { EstadoPedidoRepuestoDetailComponent } from './estado-pedido-repuesto-detail.component';
import { EstadoPedidoRepuestoUpdateComponent } from './estado-pedido-repuesto-update.component';
import {
  EstadoPedidoRepuestoDeletePopupComponent,
  EstadoPedidoRepuestoDeleteDialogComponent
} from './estado-pedido-repuesto-delete-dialog.component';
import { estadoPedidoRepuestoRoute, estadoPedidoRepuestoPopupRoute } from './estado-pedido-repuesto.route';

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
