import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { FormaDePagoComponent } from 'app/entities/forma-de-pago/forma-de-pago.component';
import { FormaDePagoDetailComponent } from 'app/entities/forma-de-pago/forma-de-pago-detail.component';
import { FormaDePagoUpdateComponent } from 'app/entities/forma-de-pago/forma-de-pago-update.component';
import {
  FormaDePagoDeletePopupComponent,
  FormaDePagoDeleteDialogComponent
} from 'app/entities/forma-de-pago/forma-de-pago-delete-dialog.component';
import { formaDePagoRoute, formaDePagoPopupRoute } from 'app/entities/forma-de-pago/forma-de-pago.route';

const ENTITY_STATES = [...formaDePagoRoute, ...formaDePagoPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    FormaDePagoComponent,
    FormaDePagoDetailComponent,
    FormaDePagoUpdateComponent,
    FormaDePagoDeleteDialogComponent,
    FormaDePagoDeletePopupComponent
  ],
  entryComponents: [FormaDePagoComponent, FormaDePagoUpdateComponent, FormaDePagoDeleteDialogComponent, FormaDePagoDeletePopupComponent]
})
export class SoldimetFormaDePagoModule {}
