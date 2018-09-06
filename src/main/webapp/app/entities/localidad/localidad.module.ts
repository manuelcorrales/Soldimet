import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    LocalidadComponent,
    LocalidadDetailComponent,
    LocalidadUpdateComponent,
    LocalidadDeleteDialogComponent,
    LocalidadDeletePopupComponent,
    localidadRoute,
    localidadPopupRoute
} from 'app/entities/localidad';

const ENTITY_STATES = [...localidadRoute, ...localidadPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        LocalidadComponent,
        LocalidadDeleteDialogComponent,
        LocalidadDeletePopupComponent,
        LocalidadDetailComponent,
        LocalidadUpdateComponent
    ],
    entryComponents: [LocalidadComponent, LocalidadUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetLocalidadModule {}
