import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import { SoldimetAdminModule } from 'app/admin/admin.module';
import {
    PersonaComponent,
    PersonaDetailComponent,
    PersonaUpdateComponent,
    PersonaDeleteDialogComponent,
    PersonaDeletePopupComponent,
    personaRoute,
    personaPopupRoute
} from './';

const ENTITY_STATES = [...personaRoute, ...personaPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, SoldimetAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PersonaComponent,
        PersonaDeleteDialogComponent,
        PersonaDeletePopupComponent,
        PersonaDetailComponent,
        PersonaUpdateComponent
    ],
    entryComponents: [PersonaComponent, PersonaUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetPersonaModule {}
