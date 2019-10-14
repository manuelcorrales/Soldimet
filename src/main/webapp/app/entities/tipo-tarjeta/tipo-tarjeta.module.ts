import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { TipoTarjetaComponent } from './tipo-tarjeta.component';
import { TipoTarjetaDetailComponent } from './tipo-tarjeta-detail.component';
import { TipoTarjetaUpdateComponent } from './tipo-tarjeta-update.component';
import { TipoTarjetaDeletePopupComponent, TipoTarjetaDeleteDialogComponent } from './tipo-tarjeta-delete-dialog.component';
import { tipoTarjetaRoute, tipoTarjetaPopupRoute } from './tipo-tarjeta.route';

const ENTITY_STATES = [...tipoTarjetaRoute, ...tipoTarjetaPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TipoTarjetaComponent,
    TipoTarjetaDetailComponent,
    TipoTarjetaUpdateComponent,
    TipoTarjetaDeleteDialogComponent,
    TipoTarjetaDeletePopupComponent
  ],
  entryComponents: [TipoTarjetaComponent, TipoTarjetaUpdateComponent, TipoTarjetaDeleteDialogComponent, TipoTarjetaDeletePopupComponent]
})
export class SoldimetTipoTarjetaModule {}
