import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    OperacionComponent,
    OperacionDetailComponent,
    OperacionUpdateComponent,
    OperacionDeletePopupComponent,
    OperacionDeleteDialogComponent,
    operacionRoute,
    operacionPopupRoute
} from './';

const ENTITY_STATES = [...operacionRoute, ...operacionPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OperacionComponent,
        OperacionDetailComponent,
        OperacionUpdateComponent,
        OperacionDeleteDialogComponent,
        OperacionDeletePopupComponent
    ],
    entryComponents: [OperacionComponent, OperacionUpdateComponent, OperacionDeleteDialogComponent, OperacionDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetOperacionModule {}
