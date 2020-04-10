import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { MedioDePagoTarjetaComponent } from 'app/entities/medio-de-pago-tarjeta/medio-de-pago-tarjeta.component';
import { MedioDePagoTarjetaDetailComponent } from 'app/entities/medio-de-pago-tarjeta/medio-de-pago-tarjeta-detail.component';
import { MedioDePagoTarjetaUpdateComponent } from 'app/entities/medio-de-pago-tarjeta/medio-de-pago-tarjeta-update.component';
import {
  MedioDePagoTarjetaDeletePopupComponent,
  MedioDePagoTarjetaDeleteDialogComponent
} from 'app/entities/medio-de-pago-tarjeta/medio-de-pago-tarjeta-delete-dialog.component';
import { medioDePagoTarjetaRoute, medioDePagoTarjetaPopupRoute } from 'app/entities/medio-de-pago-tarjeta/medio-de-pago-tarjeta.route';

const ENTITY_STATES = [...medioDePagoTarjetaRoute, ...medioDePagoTarjetaPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MedioDePagoTarjetaComponent,
    MedioDePagoTarjetaDetailComponent,
    MedioDePagoTarjetaUpdateComponent,
    MedioDePagoTarjetaDeleteDialogComponent,
    MedioDePagoTarjetaDeletePopupComponent
  ],
  entryComponents: [
    MedioDePagoTarjetaComponent,
    MedioDePagoTarjetaUpdateComponent,
    MedioDePagoTarjetaDeleteDialogComponent,
    MedioDePagoTarjetaDeletePopupComponent
  ]
})
export class SoldimetMedioDePagoTarjetaModule {}
