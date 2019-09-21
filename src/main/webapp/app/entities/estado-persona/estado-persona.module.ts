import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { EstadoPersonaComponent } from './estado-persona.component';
import { EstadoPersonaDetailComponent } from './estado-persona-detail.component';
import { EstadoPersonaUpdateComponent } from './estado-persona-update.component';
import { EstadoPersonaDeletePopupComponent, EstadoPersonaDeleteDialogComponent } from './estado-persona-delete-dialog.component';
import { estadoPersonaRoute, estadoPersonaPopupRoute } from './estado-persona.route';

const ENTITY_STATES = [...estadoPersonaRoute, ...estadoPersonaPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EstadoPersonaComponent,
    EstadoPersonaDetailComponent,
    EstadoPersonaUpdateComponent,
    EstadoPersonaDeleteDialogComponent,
    EstadoPersonaDeletePopupComponent
  ],
  entryComponents: [
    EstadoPersonaComponent,
    EstadoPersonaUpdateComponent,
    EstadoPersonaDeleteDialogComponent,
    EstadoPersonaDeletePopupComponent
  ]
})
export class SoldimetEstadoPersonaModule {}
