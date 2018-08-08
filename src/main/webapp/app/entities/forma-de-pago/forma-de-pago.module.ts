import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    FormaDePagoComponent,
    FormaDePagoDetailComponent,
    FormaDePagoUpdateComponent,
    FormaDePagoDeletePopupComponent,
    FormaDePagoDeleteDialogComponent,
    formaDePagoRoute,
    formaDePagoPopupRoute
} from './';

const ENTITY_STATES = [...formaDePagoRoute, ...formaDePagoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FormaDePagoComponent,
        FormaDePagoDetailComponent,
        FormaDePagoUpdateComponent,
        FormaDePagoDeleteDialogComponent,
        FormaDePagoDeletePopupComponent
    ],
    entryComponents: [FormaDePagoComponent, FormaDePagoUpdateComponent, FormaDePagoDeleteDialogComponent, FormaDePagoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetFormaDePagoModule {}
