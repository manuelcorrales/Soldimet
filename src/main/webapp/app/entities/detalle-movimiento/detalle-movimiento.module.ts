import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { DetalleMovimientoComponent } from 'app/entities/detalle-movimiento/detalle-movimiento.component';
import { DetalleMovimientoDetailComponent } from 'app/entities/detalle-movimiento/detalle-movimiento-detail.component';
import { DetalleMovimientoUpdateComponent } from 'app/entities/detalle-movimiento/detalle-movimiento-update.component';
import {
  DetalleMovimientoDeletePopupComponent,
  DetalleMovimientoDeleteDialogComponent
} from 'app/entities/detalle-movimiento/detalle-movimiento-delete-dialog.component';
import { detalleMovimientoRoute, detalleMovimientoPopupRoute } from 'app/entities/detalle-movimiento/detalle-movimiento.route';

const ENTITY_STATES = [...detalleMovimientoRoute, ...detalleMovimientoPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DetalleMovimientoComponent,
    DetalleMovimientoDetailComponent,
    DetalleMovimientoUpdateComponent,
    DetalleMovimientoDeleteDialogComponent,
    DetalleMovimientoDeletePopupComponent
  ],
  entryComponents: [
    DetalleMovimientoComponent,
    DetalleMovimientoUpdateComponent,
    DetalleMovimientoDeleteDialogComponent,
    DetalleMovimientoDeletePopupComponent
  ]
})
export class SoldimetDetalleMovimientoModule {}
