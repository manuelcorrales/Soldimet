import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    FormaDePagoComponent,
    FormaDePagoDetailComponent,
    FormaDePagoUpdateComponent,
    FormaDePagoDeleteDialogComponent,
    FormaDePagoDeletePopupComponent,
    formaDePagoRoute,
    formaDePagoPopupRoute
} from 'app/entities/forma-de-pago';

const ENTITY_STATES = [...formaDePagoRoute, ...formaDePagoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FormaDePagoComponent,
        FormaDePagoDeleteDialogComponent,
        FormaDePagoDeletePopupComponent,
        FormaDePagoDetailComponent,
        FormaDePagoUpdateComponent
    ],
    entryComponents: [FormaDePagoComponent, FormaDePagoUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetFormaDePagoModule {}
