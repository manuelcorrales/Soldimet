import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    OperacionComponent,
    OperacionDetailComponent,
    OperacionUpdateComponent,
    OperacionDeleteDialogComponent,
    OperacionDeletePopupComponent,
    operacionRoute,
    operacionPopupRoute
} from 'app/entities/operacion';

const ENTITY_STATES = [...operacionRoute, ...operacionPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        OperacionComponent,
        OperacionDetailComponent,
        OperacionDeleteDialogComponent,
        OperacionDeletePopupComponent,
        OperacionUpdateComponent
    ],
    entryComponents: [OperacionComponent, OperacionUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetOperacionModule {}
