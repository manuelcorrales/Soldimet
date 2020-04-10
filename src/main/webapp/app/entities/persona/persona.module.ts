import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { PersonaComponent } from 'app/entities/persona/persona.component';
import { PersonaDetailComponent } from 'app/entities/persona/persona-detail.component';
import { PersonaUpdateComponent } from 'app/entities/persona/persona-update.component';
import { PersonaDeletePopupComponent, PersonaDeleteDialogComponent } from 'app/entities/persona/persona-delete-dialog.component';
import { personaRoute, personaPopupRoute } from 'app/entities/persona/persona.route';

const ENTITY_STATES = [...personaRoute, ...personaPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PersonaComponent,
    PersonaDetailComponent,
    PersonaUpdateComponent,
    PersonaDeleteDialogComponent,
    PersonaDeletePopupComponent
  ],
  entryComponents: [PersonaComponent, PersonaUpdateComponent, PersonaDeleteDialogComponent, PersonaDeletePopupComponent]
})
export class SoldimetPersonaModule {}
