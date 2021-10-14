import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MedioDePagoChequeComponent } from './list/medio-de-pago-cheque.component';
import { MedioDePagoChequeDetailComponent } from './detail/medio-de-pago-cheque-detail.component';
import { MedioDePagoChequeUpdateComponent } from './update/medio-de-pago-cheque-update.component';
import { MedioDePagoChequeDeleteDialogComponent } from './delete/medio-de-pago-cheque-delete-dialog.component';
import { MedioDePagoChequeRoutingModule } from './route/medio-de-pago-cheque-routing.module';

@NgModule({
  imports: [SharedModule, MedioDePagoChequeRoutingModule],
  declarations: [
    MedioDePagoChequeComponent,
    MedioDePagoChequeDetailComponent,
    MedioDePagoChequeUpdateComponent,
    MedioDePagoChequeDeleteDialogComponent,
  ],
  entryComponents: [MedioDePagoChequeDeleteDialogComponent],
})
export class MedioDePagoChequeModule {}
