import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { EstadoDetallePedidoComponent } from './estado-detalle-pedido.component';
import { EstadoDetallePedidoDetailComponent } from './estado-detalle-pedido-detail.component';
import { EstadoDetallePedidoUpdateComponent } from './estado-detalle-pedido-update.component';
import {
  EstadoDetallePedidoDeletePopupComponent,
  EstadoDetallePedidoDeleteDialogComponent
} from './estado-detalle-pedido-delete-dialog.component';
import { estadoDetallePedidoRoute, estadoDetallePedidoPopupRoute } from './estado-detalle-pedido.route';

const ENTITY_STATES = [...estadoDetallePedidoRoute, ...estadoDetallePedidoPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EstadoDetallePedidoComponent,
    EstadoDetallePedidoDetailComponent,
    EstadoDetallePedidoUpdateComponent,
    EstadoDetallePedidoDeleteDialogComponent,
    EstadoDetallePedidoDeletePopupComponent
  ],
  entryComponents: [
    EstadoDetallePedidoComponent,
    EstadoDetallePedidoUpdateComponent,
    EstadoDetallePedidoDeleteDialogComponent,
    EstadoDetallePedidoDeletePopupComponent
  ]
})
export class SoldimetEstadoDetallePedidoModule {}
