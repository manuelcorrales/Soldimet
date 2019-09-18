import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    MedioDePagoComponent,
    MedioDePagoDetailComponent,
    MedioDePagoUpdateComponent,
    MedioDePagoDeletePopupComponent,
    MedioDePagoDeleteDialogComponent,
    medioDePagoRoute,
    medioDePagoPopupRoute
} from 'app/entities/medio-de-pago';

const ENTITY_STATES = [...medioDePagoRoute, ...medioDePagoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MedioDePagoComponent,
        MedioDePagoDetailComponent,
        MedioDePagoUpdateComponent,
        MedioDePagoDeleteDialogComponent,
        MedioDePagoDeletePopupComponent
    ],
    entryComponents: [MedioDePagoComponent, MedioDePagoUpdateComponent, MedioDePagoDeleteDialogComponent, MedioDePagoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetMedioDePagoModule {}
