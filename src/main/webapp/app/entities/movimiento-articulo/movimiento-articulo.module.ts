import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { MovimientoArticuloComponent } from 'app/entities/movimiento-articulo/movimiento-articulo.component';
import { MovimientoArticuloDetailComponent } from 'app/entities/movimiento-articulo/movimiento-articulo-detail.component';
import { MovimientoArticuloUpdateComponent } from 'app/entities/movimiento-articulo/movimiento-articulo-update.component';
import {
  MovimientoArticuloDeletePopupComponent,
  MovimientoArticuloDeleteDialogComponent
} from 'app/entities/movimiento-articulo/movimiento-articulo-delete-dialog.component';
import { movimientoArticuloRoute, movimientoArticuloPopupRoute } from 'app/entities/movimiento-articulo/movimiento-articulo.route';

const ENTITY_STATES = [...movimientoArticuloRoute, ...movimientoArticuloPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MovimientoArticuloComponent,
    MovimientoArticuloDetailComponent,
    MovimientoArticuloUpdateComponent,
    MovimientoArticuloDeleteDialogComponent,
    MovimientoArticuloDeletePopupComponent
  ],
  entryComponents: [
    MovimientoArticuloComponent,
    MovimientoArticuloUpdateComponent,
    MovimientoArticuloDeleteDialogComponent,
    MovimientoArticuloDeletePopupComponent
  ]
})
export class SoldimetMovimientoArticuloModule {}
