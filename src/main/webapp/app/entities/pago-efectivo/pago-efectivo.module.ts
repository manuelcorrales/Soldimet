import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { PagoEfectivoComponent } from 'app/entities/pago-efectivo/pago-efectivo.component';
import { PagoEfectivoDetailComponent } from 'app/entities/pago-efectivo/pago-efectivo-detail.component';
import { PagoEfectivoUpdateComponent } from 'app/entities/pago-efectivo/pago-efectivo-update.component';
import {
  PagoEfectivoDeletePopupComponent,
  PagoEfectivoDeleteDialogComponent
} from 'app/entities/pago-efectivo/pago-efectivo-delete-dialog.component';
import { pagoEfectivoRoute, pagoEfectivoPopupRoute } from 'app/entities/pago-efectivo/pago-efectivo.route';

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
