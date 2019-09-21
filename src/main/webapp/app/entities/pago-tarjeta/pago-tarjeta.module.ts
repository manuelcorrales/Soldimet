import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { PagoTarjetaComponent } from './pago-tarjeta.component';
import { PagoTarjetaDetailComponent } from './pago-tarjeta-detail.component';
import { PagoTarjetaUpdateComponent } from './pago-tarjeta-update.component';
import { PagoTarjetaDeletePopupComponent, PagoTarjetaDeleteDialogComponent } from './pago-tarjeta-delete-dialog.component';
import { pagoTarjetaRoute, pagoTarjetaPopupRoute } from './pago-tarjeta.route';

const ENTITY_STATES = [...pagoTarjetaRoute, ...pagoTarjetaPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PagoTarjetaComponent,
    PagoTarjetaDetailComponent,
    PagoTarjetaUpdateComponent,
    PagoTarjetaDeleteDialogComponent,
    PagoTarjetaDeletePopupComponent
  ],
  entryComponents: [PagoTarjetaComponent, PagoTarjetaUpdateComponent, PagoTarjetaDeleteDialogComponent, PagoTarjetaDeletePopupComponent]
})
export class SoldimetPagoTarjetaModule {}
