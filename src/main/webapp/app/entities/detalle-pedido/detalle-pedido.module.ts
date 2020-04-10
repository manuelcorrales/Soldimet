import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { DetallePedidoComponent } from 'app/entities/detalle-pedido/detalle-pedido.component';
import { DetallePedidoDetailComponent } from 'app/entities/detalle-pedido/detalle-pedido-detail.component';
import { DetallePedidoUpdateComponent } from 'app/entities/detalle-pedido/detalle-pedido-update.component';
import {
  DetallePedidoDeletePopupComponent,
  DetallePedidoDeleteDialogComponent
} from 'app/entities/detalle-pedido/detalle-pedido-delete-dialog.component';
import { detallePedidoRoute, detallePedidoPopupRoute } from 'app/entities/detalle-pedido/detalle-pedido.route';

const ENTITY_STATES = [...detallePedidoRoute, ...detallePedidoPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DetallePedidoComponent,
    DetallePedidoDetailComponent,
    DetallePedidoUpdateComponent,
    DetallePedidoDeleteDialogComponent,
    DetallePedidoDeletePopupComponent
  ],
  entryComponents: [
    DetallePedidoComponent,
    DetallePedidoUpdateComponent,
    DetallePedidoDeleteDialogComponent,
    DetallePedidoDeletePopupComponent
  ]
})
export class SoldimetDetallePedidoModule {}
