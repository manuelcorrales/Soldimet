import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { CategoriaPagoComponent } from 'app/entities/categoria-pago/categoria-pago.component';
import { CategoriaPagoDetailComponent } from 'app/entities/categoria-pago/categoria-pago-detail.component';
import { CategoriaPagoUpdateComponent } from 'app/entities/categoria-pago/categoria-pago-update.component';
import {
  CategoriaPagoDeletePopupComponent,
  CategoriaPagoDeleteDialogComponent
} from 'app/entities/categoria-pago/categoria-pago-delete-dialog.component';
import { categoriaPagoRoute, categoriaPagoPopupRoute } from 'app/entities/categoria-pago/categoria-pago.route';

const ENTITY_STATES = [...categoriaPagoRoute, ...categoriaPagoPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CategoriaPagoComponent,
    CategoriaPagoDetailComponent,
    CategoriaPagoUpdateComponent,
    CategoriaPagoDeleteDialogComponent,
    CategoriaPagoDeletePopupComponent
  ],
  entryComponents: [
    CategoriaPagoComponent,
    CategoriaPagoUpdateComponent,
    CategoriaPagoDeleteDialogComponent,
    CategoriaPagoDeletePopupComponent
  ]
})
export class SoldimetCategoriaPagoModule {}
