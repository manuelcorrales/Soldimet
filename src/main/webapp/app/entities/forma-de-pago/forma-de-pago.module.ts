import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    FormaDePagoService,
    FormaDePagoPopupService,
    FormaDePagoComponent,
    FormaDePagoDetailComponent,
    FormaDePagoDialogComponent,
    FormaDePagoPopupComponent,
    FormaDePagoDeletePopupComponent,
    FormaDePagoDeleteDialogComponent,
    formaDePagoRoute,
    formaDePagoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...formaDePagoRoute,
    ...formaDePagoPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        FormaDePagoComponent,
        FormaDePagoDetailComponent,
        FormaDePagoDialogComponent,
        FormaDePagoDeleteDialogComponent,
        FormaDePagoPopupComponent,
        FormaDePagoDeletePopupComponent,
    ],
    entryComponents: [
        FormaDePagoComponent,
        FormaDePagoDialogComponent,
        FormaDePagoPopupComponent,
        FormaDePagoDeleteDialogComponent,
        FormaDePagoDeletePopupComponent,
    ],
    providers: [
        FormaDePagoService,
        FormaDePagoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetFormaDePagoModule {}
