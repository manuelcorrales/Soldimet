import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { FormaDePagoComponent } from './forma-de-pago.component';
import { FormaDePagoDetailComponent } from './forma-de-pago-detail.component';
import { FormaDePagoUpdateComponent } from './forma-de-pago-update.component';
import { FormaDePagoDeletePopupComponent, FormaDePagoDeleteDialogComponent } from './forma-de-pago-delete-dialog.component';
import { formaDePagoRoute, formaDePagoPopupRoute } from './forma-de-pago.route';

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
