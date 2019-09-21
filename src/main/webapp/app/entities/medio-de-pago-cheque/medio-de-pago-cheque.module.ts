import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { MedioDePagoChequeComponent } from './medio-de-pago-cheque.component';
import { MedioDePagoChequeDetailComponent } from './medio-de-pago-cheque-detail.component';
import { MedioDePagoChequeUpdateComponent } from './medio-de-pago-cheque-update.component';
import {
  MedioDePagoChequeDeletePopupComponent,
  MedioDePagoChequeDeleteDialogComponent
} from './medio-de-pago-cheque-delete-dialog.component';
import { medioDePagoChequeRoute, medioDePagoChequePopupRoute } from './medio-de-pago-cheque.route';

const ENTITY_STATES = [...medioDePagoChequeRoute, ...medioDePagoChequePopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MedioDePagoChequeComponent,
    MedioDePagoChequeDetailComponent,
    MedioDePagoChequeUpdateComponent,
    MedioDePagoChequeDeleteDialogComponent,
    MedioDePagoChequeDeletePopupComponent
  ],
  entryComponents: [
    MedioDePagoChequeComponent,
    MedioDePagoChequeUpdateComponent,
    MedioDePagoChequeDeleteDialogComponent,
    MedioDePagoChequeDeletePopupComponent
  ]
})
export class SoldimetMedioDePagoChequeModule {}
