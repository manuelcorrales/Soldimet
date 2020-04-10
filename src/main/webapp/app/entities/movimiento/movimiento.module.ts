import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { MovimientoComponent } from 'app/entities/movimiento/movimiento.component';
import { MovimientoDetailComponent } from 'app/entities/movimiento/movimiento-detail.component';
import { MovimientoUpdateComponent } from 'app/entities/movimiento/movimiento-update.component';
import {
  MovimientoDeletePopupComponent,
  MovimientoDeleteDialogComponent
} from 'app/entities/movimiento/movimiento-delete-dialog.component';
import { movimientoRoute, movimientoPopupRoute } from 'app/entities/movimiento/movimiento.route';

const ENTITY_STATES = [...movimientoRoute, ...movimientoPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MovimientoComponent,
    MovimientoDetailComponent,
    MovimientoUpdateComponent,
    MovimientoDeleteDialogComponent,
    MovimientoDeletePopupComponent
  ],
  entryComponents: [MovimientoComponent, MovimientoUpdateComponent, MovimientoDeleteDialogComponent, MovimientoDeletePopupComponent]
})
export class SoldimetMovimientoModule {}
