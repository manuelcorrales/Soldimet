import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { TipoMovimientoComponent } from './tipo-movimiento.component';
import { TipoMovimientoDetailComponent } from './tipo-movimiento-detail.component';
import { TipoMovimientoUpdateComponent } from './tipo-movimiento-update.component';
import { TipoMovimientoDeletePopupComponent, TipoMovimientoDeleteDialogComponent } from './tipo-movimiento-delete-dialog.component';
import { tipoMovimientoRoute, tipoMovimientoPopupRoute } from './tipo-movimiento.route';

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
