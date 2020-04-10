import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { EstadoPersonaComponent } from 'app/entities/estado-persona/estado-persona.component';
import { EstadoPersonaDetailComponent } from 'app/entities/estado-persona/estado-persona-detail.component';
import { EstadoPersonaUpdateComponent } from 'app/entities/estado-persona/estado-persona-update.component';
import {
  EstadoPersonaDeletePopupComponent,
  EstadoPersonaDeleteDialogComponent
} from 'app/entities/estado-persona/estado-persona-delete-dialog.component';
import { estadoPersonaRoute, estadoPersonaPopupRoute } from 'app/entities/estado-persona/estado-persona.route';

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
