import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import { SoldimetAdminModule } from '../../admin/admin.module';
import {
    PersonaService,
    PersonaPopupService,
    PersonaComponent,
    PersonaDetailComponent,
    PersonaDialogComponent,
    PersonaPopupComponent,
    PersonaDeletePopupComponent,
    PersonaDeleteDialogComponent,
    personaRoute,
    personaPopupRoute,
    PersonaResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...personaRoute,
    ...personaPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        SoldimetAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PersonaComponent,
        PersonaDetailComponent,
        PersonaDialogComponent,
        PersonaDeleteDialogComponent,
        PersonaPopupComponent,
        PersonaDeletePopupComponent,
    ],
    entryComponents: [
        PersonaComponent,
        PersonaDialogComponent,
        PersonaPopupComponent,
        PersonaDeleteDialogComponent,
        PersonaDeletePopupComponent,
    ],
    providers: [
        PersonaService,
        PersonaPopupService,
        PersonaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetPersonaModule {}
