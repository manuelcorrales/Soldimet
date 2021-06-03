import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { MovimientoArticuloComponent } from './movimiento-articulo.component';
import { MovimientoArticuloDetailComponent } from './movimiento-articulo-detail.component';
import { MovimientoArticuloUpdateComponent } from './movimiento-articulo-update.component';
import {
  MovimientoArticuloDeletePopupComponent,
  MovimientoArticuloDeleteDialogComponent
} from './movimiento-articulo-delete-dialog.component';
import { movimientoArticuloRoute, movimientoArticuloPopupRoute } from './movimiento-articulo.route';

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
