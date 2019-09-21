import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { EstadoOperacionComponent } from './estado-operacion.component';
import { EstadoOperacionDetailComponent } from './estado-operacion-detail.component';
import { EstadoOperacionUpdateComponent } from './estado-operacion-update.component';
import { EstadoOperacionDeletePopupComponent, EstadoOperacionDeleteDialogComponent } from './estado-operacion-delete-dialog.component';
import { estadoOperacionRoute, estadoOperacionPopupRoute } from './estado-operacion.route';

const ENTITY_STATES = [...estadoOperacionRoute, ...estadoOperacionPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EstadoOperacionComponent,
    EstadoOperacionDetailComponent,
    EstadoOperacionUpdateComponent,
    EstadoOperacionDeleteDialogComponent,
    EstadoOperacionDeletePopupComponent
  ],
  entryComponents: [
    EstadoOperacionComponent,
    EstadoOperacionUpdateComponent,
    EstadoOperacionDeleteDialogComponent,
    EstadoOperacionDeletePopupComponent
  ]
})
export class SoldimetEstadoOperacionModule {}
