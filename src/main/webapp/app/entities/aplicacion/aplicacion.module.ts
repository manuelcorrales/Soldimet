import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    AplicacionService,
    AplicacionPopupService,
    AplicacionComponent,
    AplicacionDetailComponent,
    AplicacionDialogComponent,
    AplicacionPopupComponent,
    AplicacionDeletePopupComponent,
    AplicacionDeleteDialogComponent,
    aplicacionRoute,
    aplicacionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...aplicacionRoute,
    ...aplicacionPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AplicacionComponent,
        AplicacionDetailComponent,
        AplicacionDialogComponent,
        AplicacionDeleteDialogComponent,
        AplicacionPopupComponent,
        AplicacionDeletePopupComponent,
    ],
    entryComponents: [
        AplicacionComponent,
        AplicacionDialogComponent,
        AplicacionPopupComponent,
        AplicacionDeleteDialogComponent,
        AplicacionDeletePopupComponent,
    ],
    providers: [
        AplicacionService,
        AplicacionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetAplicacionModule {}
