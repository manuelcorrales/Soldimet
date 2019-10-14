import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { PagoEfectivoComponent } from './pago-efectivo.component';
import { PagoEfectivoDetailComponent } from './pago-efectivo-detail.component';
import { PagoEfectivoUpdateComponent } from './pago-efectivo-update.component';
import { PagoEfectivoDeletePopupComponent, PagoEfectivoDeleteDialogComponent } from './pago-efectivo-delete-dialog.component';
import { pagoEfectivoRoute, pagoEfectivoPopupRoute } from './pago-efectivo.route';

const ENTITY_STATES = [...pagoEfectivoRoute, ...pagoEfectivoPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PagoEfectivoComponent,
    PagoEfectivoDetailComponent,
    PagoEfectivoUpdateComponent,
    PagoEfectivoDeleteDialogComponent,
    PagoEfectivoDeletePopupComponent
  ],
  entryComponents: [PagoEfectivoComponent, PagoEfectivoUpdateComponent, PagoEfectivoDeleteDialogComponent, PagoEfectivoDeletePopupComponent]
})
export class SoldimetPagoEfectivoModule {}
