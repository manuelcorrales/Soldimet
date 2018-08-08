import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    PrecioRepuestoComponent,
    PrecioRepuestoDetailComponent,
    PrecioRepuestoUpdateComponent,
    PrecioRepuestoDeletePopupComponent,
    PrecioRepuestoDeleteDialogComponent,
    precioRepuestoRoute,
    precioRepuestoPopupRoute
} from './';

const ENTITY_STATES = [...precioRepuestoRoute, ...precioRepuestoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PrecioRepuestoComponent,
        PrecioRepuestoDetailComponent,
        PrecioRepuestoUpdateComponent,
        PrecioRepuestoDeleteDialogComponent,
        PrecioRepuestoDeletePopupComponent
    ],
    entryComponents: [
        PrecioRepuestoComponent,
        PrecioRepuestoUpdateComponent,
        PrecioRepuestoDeleteDialogComponent,
        PrecioRepuestoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetPrecioRepuestoModule {}
