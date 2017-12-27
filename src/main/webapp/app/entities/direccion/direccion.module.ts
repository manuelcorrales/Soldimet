import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    DireccionService,
    DireccionPopupService,
    DireccionComponent,
    DireccionDetailComponent,
    DireccionDialogComponent,
    DireccionPopupComponent,
    DireccionDeletePopupComponent,
    DireccionDeleteDialogComponent,
    direccionRoute,
    direccionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...direccionRoute,
    ...direccionPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DireccionComponent,
        DireccionDetailComponent,
        DireccionDialogComponent,
        DireccionDeleteDialogComponent,
        DireccionPopupComponent,
        DireccionDeletePopupComponent,
    ],
    entryComponents: [
        DireccionComponent,
        DireccionDialogComponent,
        DireccionPopupComponent,
        DireccionDeleteDialogComponent,
        DireccionDeletePopupComponent,
    ],
    providers: [
        DireccionService,
        DireccionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetDireccionModule {}
