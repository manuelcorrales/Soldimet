import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MedioDePagoTarjetaComponent } from './list/medio-de-pago-tarjeta.component';
import { MedioDePagoTarjetaDetailComponent } from './detail/medio-de-pago-tarjeta-detail.component';
import { MedioDePagoTarjetaUpdateComponent } from './update/medio-de-pago-tarjeta-update.component';
import { MedioDePagoTarjetaDeleteDialogComponent } from './delete/medio-de-pago-tarjeta-delete-dialog.component';
import { MedioDePagoTarjetaRoutingModule } from './route/medio-de-pago-tarjeta-routing.module';

@NgModule({
  imports: [SharedModule, MedioDePagoTarjetaRoutingModule],
  declarations: [
    MedioDePagoTarjetaComponent,
    MedioDePagoTarjetaDetailComponent,
    MedioDePagoTarjetaUpdateComponent,
    MedioDePagoTarjetaDeleteDialogComponent,
  ],
  entryComponents: [MedioDePagoTarjetaDeleteDialogComponent],
})
export class MedioDePagoTarjetaModule {}
