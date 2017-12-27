import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    OperacionService,
    OperacionPopupService,
    OperacionComponent,
    OperacionDetailComponent,
    OperacionDialogComponent,
    OperacionPopupComponent,
    OperacionDeletePopupComponent,
    OperacionDeleteDialogComponent,
    operacionRoute,
    operacionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...operacionRoute,
    ...operacionPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        OperacionComponent,
        OperacionDetailComponent,
        OperacionDialogComponent,
        OperacionDeleteDialogComponent,
        OperacionPopupComponent,
        OperacionDeletePopupComponent,
    ],
    entryComponents: [
        OperacionComponent,
        OperacionDialogComponent,
        OperacionPopupComponent,
        OperacionDeleteDialogComponent,
        OperacionDeletePopupComponent,
    ],
    providers: [
        OperacionService,
        OperacionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetOperacionModule {}
