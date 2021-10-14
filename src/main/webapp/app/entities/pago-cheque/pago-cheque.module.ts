import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PagoChequeComponent } from './list/pago-cheque.component';
import { PagoChequeDetailComponent } from './detail/pago-cheque-detail.component';
import { PagoChequeUpdateComponent } from './update/pago-cheque-update.component';
import { PagoChequeDeleteDialogComponent } from './delete/pago-cheque-delete-dialog.component';
import { PagoChequeRoutingModule } from './route/pago-cheque-routing.module';

@NgModule({
  imports: [SharedModule, PagoChequeRoutingModule],
  declarations: [PagoChequeComponent, PagoChequeDetailComponent, PagoChequeUpdateComponent, PagoChequeDeleteDialogComponent],
  entryComponents: [PagoChequeDeleteDialogComponent],
})
export class PagoChequeModule {}
