import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PagoTarjetaComponent } from './list/pago-tarjeta.component';
import { PagoTarjetaDetailComponent } from './detail/pago-tarjeta-detail.component';
import { PagoTarjetaUpdateComponent } from './update/pago-tarjeta-update.component';
import { PagoTarjetaDeleteDialogComponent } from './delete/pago-tarjeta-delete-dialog.component';
import { PagoTarjetaRoutingModule } from './route/pago-tarjeta-routing.module';

@NgModule({
  imports: [SharedModule, PagoTarjetaRoutingModule],
  declarations: [PagoTarjetaComponent, PagoTarjetaDetailComponent, PagoTarjetaUpdateComponent, PagoTarjetaDeleteDialogComponent],
  entryComponents: [PagoTarjetaDeleteDialogComponent],
})
export class PagoTarjetaModule {}
