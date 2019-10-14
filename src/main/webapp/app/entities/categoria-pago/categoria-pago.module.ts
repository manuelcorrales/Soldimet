import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { CategoriaPagoComponent } from './categoria-pago.component';
import { CategoriaPagoDetailComponent } from './categoria-pago-detail.component';
import { CategoriaPagoUpdateComponent } from './categoria-pago-update.component';
import { CategoriaPagoDeletePopupComponent, CategoriaPagoDeleteDialogComponent } from './categoria-pago-delete-dialog.component';
import { categoriaPagoRoute, categoriaPagoPopupRoute } from './categoria-pago.route';

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
