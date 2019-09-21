import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { MovimientoPedidoComponent } from './movimiento-pedido.component';
import { MovimientoPedidoDetailComponent } from './movimiento-pedido-detail.component';
import { MovimientoPedidoUpdateComponent } from './movimiento-pedido-update.component';
import { MovimientoPedidoDeletePopupComponent, MovimientoPedidoDeleteDialogComponent } from './movimiento-pedido-delete-dialog.component';
import { movimientoPedidoRoute, movimientoPedidoPopupRoute } from './movimiento-pedido.route';

const ENTITY_STATES = [...movimientoPedidoRoute, ...movimientoPedidoPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MovimientoPedidoComponent,
    MovimientoPedidoDetailComponent,
    MovimientoPedidoUpdateComponent,
    MovimientoPedidoDeleteDialogComponent,
    MovimientoPedidoDeletePopupComponent
  ],
  entryComponents: [
    MovimientoPedidoComponent,
    MovimientoPedidoUpdateComponent,
    MovimientoPedidoDeleteDialogComponent,
    MovimientoPedidoDeletePopupComponent
  ]
})
export class SoldimetMovimientoPedidoModule {}
