import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    LocalidadComponent,
    LocalidadDetailComponent,
    LocalidadUpdateComponent,
    LocalidadDeletePopupComponent,
    LocalidadDeleteDialogComponent,
    localidadRoute,
    localidadPopupRoute
} from './';

const ENTITY_STATES = [...localidadRoute, ...localidadPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LocalidadComponent,
        LocalidadDetailComponent,
        LocalidadUpdateComponent,
        LocalidadDeleteDialogComponent,
        LocalidadDeletePopupComponent
    ],
    entryComponents: [LocalidadComponent, LocalidadUpdateComponent, LocalidadDeleteDialogComponent, LocalidadDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetLocalidadModule {}
