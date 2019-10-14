import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { CajaComponent } from './caja.component';
import { CajaDetailComponent } from './caja-detail.component';
import { CajaUpdateComponent } from './caja-update.component';
import { CajaDeletePopupComponent, CajaDeleteDialogComponent } from './caja-delete-dialog.component';
import { cajaRoute, cajaPopupRoute } from './caja.route';

const ENTITY_STATES = [...cajaRoute, ...cajaPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [CajaComponent, CajaDetailComponent, CajaUpdateComponent, CajaDeleteDialogComponent, CajaDeletePopupComponent],
  entryComponents: [CajaComponent, CajaUpdateComponent, CajaDeleteDialogComponent, CajaDeletePopupComponent]
})
export class SoldimetCajaModule {}
