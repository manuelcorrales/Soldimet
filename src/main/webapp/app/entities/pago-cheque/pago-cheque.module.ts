import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    PagoChequeComponent,
    PagoChequeDetailComponent,
    PagoChequeUpdateComponent,
    PagoChequeDeleteDialogComponent,
    PagoChequeDeletePopupComponent,
    pagoChequeRoute,
    pagoChequePopupRoute
} from 'app/entities/pago-cheque';

const ENTITY_STATES = [...pagoChequeRoute, ...pagoChequePopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PagoChequeComponent,
        PagoChequeDeleteDialogComponent,
        PagoChequeDeletePopupComponent,
        PagoChequeDetailComponent,
        PagoChequeUpdateComponent
    ],
    entryComponents: [PagoChequeComponent, PagoChequeUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetPagoChequeModule {}
