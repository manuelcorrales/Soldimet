import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PagoEfectivoComponent } from './list/pago-efectivo.component';
import { PagoEfectivoDetailComponent } from './detail/pago-efectivo-detail.component';
import { PagoEfectivoUpdateComponent } from './update/pago-efectivo-update.component';
import { PagoEfectivoDeleteDialogComponent } from './delete/pago-efectivo-delete-dialog.component';
import { PagoEfectivoRoutingModule } from './route/pago-efectivo-routing.module';

@NgModule({
  imports: [SharedModule, PagoEfectivoRoutingModule],
  declarations: [PagoEfectivoComponent, PagoEfectivoDetailComponent, PagoEfectivoUpdateComponent, PagoEfectivoDeleteDialogComponent],
  entryComponents: [PagoEfectivoDeleteDialogComponent],
})
export class PagoEfectivoModule {}
