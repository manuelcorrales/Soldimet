import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    CostoRepuestoService,
    CostoRepuestoPopupService,
    CostoRepuestoComponent,
    CostoRepuestoDetailComponent,
    CostoRepuestoDialogComponent,
    CostoRepuestoPopupComponent,
    CostoRepuestoDeletePopupComponent,
    CostoRepuestoDeleteDialogComponent,
    costoRepuestoRoute,
    costoRepuestoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...costoRepuestoRoute,
    ...costoRepuestoPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CostoRepuestoComponent,
        CostoRepuestoDetailComponent,
        CostoRepuestoDialogComponent,
        CostoRepuestoDeleteDialogComponent,
        CostoRepuestoPopupComponent,
        CostoRepuestoDeletePopupComponent,
    ],
    entryComponents: [
        CostoRepuestoComponent,
        CostoRepuestoDialogComponent,
        CostoRepuestoPopupComponent,
        CostoRepuestoDeleteDialogComponent,
        CostoRepuestoDeletePopupComponent,
    ],
    providers: [
        CostoRepuestoService,
        CostoRepuestoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetCostoRepuestoModule {}
