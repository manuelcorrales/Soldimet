import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MedioDePagoComponent } from './list/medio-de-pago.component';
import { MedioDePagoDetailComponent } from './detail/medio-de-pago-detail.component';
import { MedioDePagoUpdateComponent } from './update/medio-de-pago-update.component';
import { MedioDePagoDeleteDialogComponent } from './delete/medio-de-pago-delete-dialog.component';
import { MedioDePagoRoutingModule } from './route/medio-de-pago-routing.module';

@NgModule({
  imports: [SharedModule, MedioDePagoRoutingModule],
  declarations: [MedioDePagoComponent, MedioDePagoDetailComponent, MedioDePagoUpdateComponent, MedioDePagoDeleteDialogComponent],
  entryComponents: [MedioDePagoDeleteDialogComponent],
})
export class MedioDePagoModule {}
