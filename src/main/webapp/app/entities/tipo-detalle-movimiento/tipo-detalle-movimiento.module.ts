import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { TipoDetalleMovimientoComponent } from './tipo-detalle-movimiento.component';
import { TipoDetalleMovimientoDetailComponent } from './tipo-detalle-movimiento-detail.component';
import { TipoDetalleMovimientoUpdateComponent } from './tipo-detalle-movimiento-update.component';
import {
  TipoDetalleMovimientoDeletePopupComponent,
  TipoDetalleMovimientoDeleteDialogComponent
} from './tipo-detalle-movimiento-delete-dialog.component';
import { tipoDetalleMovimientoRoute, tipoDetalleMovimientoPopupRoute } from './tipo-detalle-movimiento.route';

const ENTITY_STATES = [...tipoDetalleMovimientoRoute, ...tipoDetalleMovimientoPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TipoDetalleMovimientoComponent,
    TipoDetalleMovimientoDetailComponent,
    TipoDetalleMovimientoUpdateComponent,
    TipoDetalleMovimientoDeleteDialogComponent,
    TipoDetalleMovimientoDeletePopupComponent
  ],
  entryComponents: [
    TipoDetalleMovimientoComponent,
    TipoDetalleMovimientoUpdateComponent,
    TipoDetalleMovimientoDeleteDialogComponent,
    TipoDetalleMovimientoDeletePopupComponent
  ]
})
export class SoldimetTipoDetalleMovimientoModule {}
