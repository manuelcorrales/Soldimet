import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    LocalidadService,
    LocalidadPopupService,
    LocalidadComponent,
    LocalidadDetailComponent,
    LocalidadDialogComponent,
    LocalidadPopupComponent,
    LocalidadDeletePopupComponent,
    LocalidadDeleteDialogComponent,
    localidadRoute,
    localidadPopupRoute,
} from './';

const ENTITY_STATES = [
    ...localidadRoute,
    ...localidadPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        LocalidadComponent,
        LocalidadDetailComponent,
        LocalidadDialogComponent,
        LocalidadDeleteDialogComponent,
        LocalidadPopupComponent,
        LocalidadDeletePopupComponent,
    ],
    entryComponents: [
        LocalidadComponent,
        LocalidadDialogComponent,
        LocalidadPopupComponent,
        LocalidadDeleteDialogComponent,
        LocalidadDeletePopupComponent,
    ],
    providers: [
        LocalidadService,
        LocalidadPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetLocalidadModule {}
