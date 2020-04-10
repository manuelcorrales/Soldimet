import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { TarjetaComponent } from 'app/entities/tarjeta/tarjeta.component';
import { TarjetaDetailComponent } from 'app/entities/tarjeta/tarjeta-detail.component';
import { TarjetaUpdateComponent } from 'app/entities/tarjeta/tarjeta-update.component';
import { TarjetaDeletePopupComponent, TarjetaDeleteDialogComponent } from 'app/entities/tarjeta/tarjeta-delete-dialog.component';
import { tarjetaRoute, tarjetaPopupRoute } from 'app/entities/tarjeta/tarjeta.route';

const ENTITY_STATES = [...tarjetaRoute, ...tarjetaPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TarjetaComponent,
    TarjetaDetailComponent,
    TarjetaUpdateComponent,
    TarjetaDeleteDialogComponent,
    TarjetaDeletePopupComponent
  ],
  entryComponents: [TarjetaComponent, TarjetaUpdateComponent, TarjetaDeleteDialogComponent, TarjetaDeletePopupComponent]
})
export class SoldimetTarjetaModule {}
