import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { PagoChequeComponent } from 'app/entities/pago-cheque/pago-cheque.component';
import { PagoChequeDetailComponent } from 'app/entities/pago-cheque/pago-cheque-detail.component';
import { PagoChequeUpdateComponent } from 'app/entities/pago-cheque/pago-cheque-update.component';
import {
  PagoChequeDeletePopupComponent,
  PagoChequeDeleteDialogComponent
} from 'app/entities/pago-cheque/pago-cheque-delete-dialog.component';
import { pagoChequeRoute, pagoChequePopupRoute } from 'app/entities/pago-cheque/pago-cheque.route';

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
