import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { PagoChequeComponent } from './pago-cheque.component';
import { PagoChequeDetailComponent } from './pago-cheque-detail.component';
import { PagoChequeUpdateComponent } from './pago-cheque-update.component';
import { PagoChequeDeletePopupComponent, PagoChequeDeleteDialogComponent } from './pago-cheque-delete-dialog.component';
import { pagoChequeRoute, pagoChequePopupRoute } from './pago-cheque.route';

const ENTITY_STATES = [...pagoChequeRoute, ...pagoChequePopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PagoChequeComponent,
    PagoChequeDetailComponent,
    PagoChequeUpdateComponent,
    PagoChequeDeleteDialogComponent,
    PagoChequeDeletePopupComponent
  ],
  entryComponents: [PagoChequeComponent, PagoChequeUpdateComponent, PagoChequeDeleteDialogComponent, PagoChequeDeletePopupComponent]
})
export class SoldimetPagoChequeModule {}
