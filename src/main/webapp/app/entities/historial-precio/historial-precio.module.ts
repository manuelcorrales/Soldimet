import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { HistorialPrecioComponent } from 'app/entities/historial-precio/historial-precio.component';
import { HistorialPrecioDetailComponent } from 'app/entities/historial-precio/historial-precio-detail.component';
import { HistorialPrecioUpdateComponent } from 'app/entities/historial-precio/historial-precio-update.component';
import {
  HistorialPrecioDeletePopupComponent,
  HistorialPrecioDeleteDialogComponent
} from 'app/entities/historial-precio/historial-precio-delete-dialog.component';
import { historialPrecioRoute, historialPrecioPopupRoute } from 'app/entities/historial-precio/historial-precio.route';

const ENTITY_STATES = [...historialPrecioRoute, ...historialPrecioPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    HistorialPrecioComponent,
    HistorialPrecioDetailComponent,
    HistorialPrecioUpdateComponent,
    HistorialPrecioDeleteDialogComponent,
    HistorialPrecioDeletePopupComponent
  ],
  entryComponents: [
    HistorialPrecioComponent,
    HistorialPrecioUpdateComponent,
    HistorialPrecioDeleteDialogComponent,
    HistorialPrecioDeletePopupComponent
  ]
})
export class SoldimetHistorialPrecioModule {}
