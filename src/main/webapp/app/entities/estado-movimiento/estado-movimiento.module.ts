import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { EstadoMovimientoComponent } from './estado-movimiento.component';
import { EstadoMovimientoDetailComponent } from './estado-movimiento-detail.component';
import { EstadoMovimientoUpdateComponent } from './estado-movimiento-update.component';
import { EstadoMovimientoDeletePopupComponent, EstadoMovimientoDeleteDialogComponent } from './estado-movimiento-delete-dialog.component';
import { estadoMovimientoRoute, estadoMovimientoPopupRoute } from './estado-movimiento.route';

const ENTITY_STATES = [...estadoMovimientoRoute, ...estadoMovimientoPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EstadoMovimientoComponent,
    EstadoMovimientoDetailComponent,
    EstadoMovimientoUpdateComponent,
    EstadoMovimientoDeleteDialogComponent,
    EstadoMovimientoDeletePopupComponent
  ],
  entryComponents: [
    EstadoMovimientoComponent,
    EstadoMovimientoUpdateComponent,
    EstadoMovimientoDeleteDialogComponent,
    EstadoMovimientoDeletePopupComponent
  ]
})
export class SoldimetEstadoMovimientoModule {}
