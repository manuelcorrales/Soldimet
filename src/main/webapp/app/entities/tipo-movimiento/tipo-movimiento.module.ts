import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { TipoMovimientoComponent } from 'app/entities/tipo-movimiento/tipo-movimiento.component';
import { TipoMovimientoDetailComponent } from 'app/entities/tipo-movimiento/tipo-movimiento-detail.component';
import { TipoMovimientoUpdateComponent } from 'app/entities/tipo-movimiento/tipo-movimiento-update.component';
import {
  TipoMovimientoDeletePopupComponent,
  TipoMovimientoDeleteDialogComponent
} from 'app/entities/tipo-movimiento/tipo-movimiento-delete-dialog.component';
import { tipoMovimientoRoute, tipoMovimientoPopupRoute } from 'app/entities/tipo-movimiento/tipo-movimiento.route';

const ENTITY_STATES = [...tipoMovimientoRoute, ...tipoMovimientoPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TipoMovimientoComponent,
    TipoMovimientoDetailComponent,
    TipoMovimientoUpdateComponent,
    TipoMovimientoDeleteDialogComponent,
    TipoMovimientoDeletePopupComponent
  ],
  entryComponents: [
    TipoMovimientoComponent,
    TipoMovimientoUpdateComponent,
    TipoMovimientoDeleteDialogComponent,
    TipoMovimientoDeletePopupComponent
  ]
})
export class SoldimetTipoMovimientoModule {}
