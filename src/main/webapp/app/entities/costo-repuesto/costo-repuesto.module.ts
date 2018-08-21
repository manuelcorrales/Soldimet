import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    CostoRepuestoComponent,
    CostoRepuestoDetailComponent,
    CostoRepuestoUpdateComponent,
    CostoRepuestoDeleteDialogComponent,
    costoRepuestoRoute,
    costoRepuestoPopupRoute,
    CostoRepuestoDeletePopupComponent
} from './';

const ENTITY_STATES = [...costoRepuestoRoute, ...costoRepuestoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CostoRepuestoComponent,
        CostoRepuestoDetailComponent,
        CostoRepuestoDeletePopupComponent,
        CostoRepuestoUpdateComponent,
        CostoRepuestoDeleteDialogComponent
    ],
    entryComponents: [CostoRepuestoComponent, CostoRepuestoUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetCostoRepuestoModule {}
