import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    PagoChequeService,
    PagoChequePopupService,
    PagoChequeComponent,
    PagoChequeDetailComponent,
    PagoChequeDialogComponent,
    PagoChequePopupComponent,
    PagoChequeDeletePopupComponent,
    PagoChequeDeleteDialogComponent,
    pagoChequeRoute,
    pagoChequePopupRoute,
} from './';

const ENTITY_STATES = [
    ...pagoChequeRoute,
    ...pagoChequePopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PagoChequeComponent,
        PagoChequeDetailComponent,
        PagoChequeDialogComponent,
        PagoChequeDeleteDialogComponent,
        PagoChequePopupComponent,
        PagoChequeDeletePopupComponent,
    ],
    entryComponents: [
        PagoChequeComponent,
        PagoChequeDialogComponent,
        PagoChequePopupComponent,
        PagoChequeDeleteDialogComponent,
        PagoChequeDeletePopupComponent,
    ],
    providers: [
        PagoChequeService,
        PagoChequePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetPagoChequeModule {}
