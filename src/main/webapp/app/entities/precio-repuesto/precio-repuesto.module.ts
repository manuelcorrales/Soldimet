import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    PrecioRepuestoComponent,
    PrecioRepuestoDetailComponent,
    PrecioRepuestoUpdateComponent,
    PrecioRepuestoDeleteDialogComponent,
    PrecioRepuestoDeletePopupComponent,
    precioRepuestoRoute,
    precioRepuestoPopupRoute
} from 'app/entities/precio-repuesto';

const ENTITY_STATES = [...precioRepuestoRoute, ...precioRepuestoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PrecioRepuestoComponent,
        PrecioRepuestoDetailComponent,
        PrecioRepuestoDeleteDialogComponent,
        PrecioRepuestoDeletePopupComponent,
        PrecioRepuestoUpdateComponent
    ],
    entryComponents: [PrecioRepuestoComponent, PrecioRepuestoUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetPrecioRepuestoModule {}
