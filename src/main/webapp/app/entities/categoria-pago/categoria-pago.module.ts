import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CategoriaPagoComponent } from './list/categoria-pago.component';
import { CategoriaPagoDetailComponent } from './detail/categoria-pago-detail.component';
import { CategoriaPagoUpdateComponent } from './update/categoria-pago-update.component';
import { CategoriaPagoDeleteDialogComponent } from './delete/categoria-pago-delete-dialog.component';
import { CategoriaPagoRoutingModule } from './route/categoria-pago-routing.module';

@NgModule({
  imports: [SharedModule, CategoriaPagoRoutingModule],
  declarations: [CategoriaPagoComponent, CategoriaPagoDetailComponent, CategoriaPagoUpdateComponent, CategoriaPagoDeleteDialogComponent],
  entryComponents: [CategoriaPagoDeleteDialogComponent],
})
export class CategoriaPagoModule {}
