import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { CajaComponent } from 'app/entities/caja/caja.component';
import { CajaDetailComponent } from 'app/entities/caja/caja-detail.component';
import { CajaUpdateComponent } from 'app/entities/caja/caja-update.component';
import { CajaDeletePopupComponent, CajaDeleteDialogComponent } from 'app/entities/caja/caja-delete-dialog.component';
import { cajaRoute, cajaPopupRoute } from 'app/entities/caja/caja.route';

const ENTITY_STATES = [...cajaRoute, ...cajaPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [CajaComponent, CajaDetailComponent, CajaUpdateComponent, CajaDeleteDialogComponent, CajaDeletePopupComponent],
  entryComponents: [CajaComponent, CajaUpdateComponent, CajaDeleteDialogComponent, CajaDeletePopupComponent]
})
export class SoldimetCajaModule {}
