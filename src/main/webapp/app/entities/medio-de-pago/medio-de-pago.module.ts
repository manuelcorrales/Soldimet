import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { MedioDePagoComponent } from './medio-de-pago.component';
import { MedioDePagoDetailComponent } from './medio-de-pago-detail.component';
import { MedioDePagoUpdateComponent } from './medio-de-pago-update.component';
import { MedioDePagoDeletePopupComponent, MedioDePagoDeleteDialogComponent } from './medio-de-pago-delete-dialog.component';
import { medioDePagoRoute, medioDePagoPopupRoute } from './medio-de-pago.route';

const ENTITY_STATES = [...medioDePagoRoute, ...medioDePagoPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MedioDePagoComponent,
    MedioDePagoDetailComponent,
    MedioDePagoUpdateComponent,
    MedioDePagoDeleteDialogComponent,
    MedioDePagoDeletePopupComponent
  ],
  entryComponents: [MedioDePagoComponent, MedioDePagoUpdateComponent, MedioDePagoDeleteDialogComponent, MedioDePagoDeletePopupComponent]
})
export class SoldimetMedioDePagoModule {}
