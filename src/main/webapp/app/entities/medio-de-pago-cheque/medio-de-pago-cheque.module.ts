import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    MedioDePagoChequeComponent,
    MedioDePagoChequeDetailComponent,
    MedioDePagoChequeUpdateComponent,
    MedioDePagoChequeDeletePopupComponent,
    MedioDePagoChequeDeleteDialogComponent,
    medioDePagoChequeRoute,
    medioDePagoChequePopupRoute
} from './';

const ENTITY_STATES = [...medioDePagoChequeRoute, ...medioDePagoChequePopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MedioDePagoChequeComponent,
        MedioDePagoChequeDetailComponent,
        MedioDePagoChequeUpdateComponent,
        MedioDePagoChequeDeleteDialogComponent,
        MedioDePagoChequeDeletePopupComponent
    ],
    entryComponents: [
        MedioDePagoChequeComponent,
        MedioDePagoChequeUpdateComponent,
        MedioDePagoChequeDeleteDialogComponent,
        MedioDePagoChequeDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetMedioDePagoChequeModule {}
