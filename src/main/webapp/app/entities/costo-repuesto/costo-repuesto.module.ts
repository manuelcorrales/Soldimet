import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    CostoRepuestoComponent,
    CostoRepuestoDetailComponent,
    CostoRepuestoUpdateComponent,
    CostoRepuestoDeletePopupComponent,
    CostoRepuestoDeleteDialogComponent,
    costoRepuestoRoute,
    costoRepuestoPopupRoute
} from './';

const ENTITY_STATES = [...costoRepuestoRoute, ...costoRepuestoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CostoRepuestoComponent,
        CostoRepuestoDetailComponent,
        CostoRepuestoUpdateComponent,
        CostoRepuestoDeleteDialogComponent,
        CostoRepuestoDeletePopupComponent
    ],
    entryComponents: [
        CostoRepuestoComponent,
        CostoRepuestoUpdateComponent,
        CostoRepuestoDeleteDialogComponent,
        CostoRepuestoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetCostoRepuestoModule {}
