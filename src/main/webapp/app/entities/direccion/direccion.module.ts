import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    DireccionComponent,
    DireccionDetailComponent,
    DireccionUpdateComponent,
    DireccionDeleteDialogComponent,
    direccionRoute,
    DireccionDeletePopupComponent,
    direccionPopupRoute
} from './';

const ENTITY_STATES = [...direccionRoute, ...direccionPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DireccionComponent,
        DireccionDeletePopupComponent,
        DireccionDetailComponent,
        DireccionDeleteDialogComponent,
        DireccionUpdateComponent
    ],
    entryComponents: [DireccionComponent, DireccionUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetDireccionModule {}
