import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { DetalleMovimientoComponent } from './detalle-movimiento.component';
import { DetalleMovimientoDetailComponent } from './detalle-movimiento-detail.component';
import { DetalleMovimientoUpdateComponent } from './detalle-movimiento-update.component';
import {
  DetalleMovimientoDeletePopupComponent,
  DetalleMovimientoDeleteDialogComponent
} from './detalle-movimiento-delete-dialog.component';
import { detalleMovimientoRoute, detalleMovimientoPopupRoute } from './detalle-movimiento.route';

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
