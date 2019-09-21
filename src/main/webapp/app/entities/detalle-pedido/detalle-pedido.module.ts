import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { DetallePedidoComponent } from './detalle-pedido.component';
import { DetallePedidoDetailComponent } from './detalle-pedido-detail.component';
import { DetallePedidoUpdateComponent } from './detalle-pedido-update.component';
import { DetallePedidoDeletePopupComponent, DetallePedidoDeleteDialogComponent } from './detalle-pedido-delete-dialog.component';
import { detallePedidoRoute, detallePedidoPopupRoute } from './detalle-pedido.route';

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
