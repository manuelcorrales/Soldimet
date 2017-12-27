import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    PrecioRepuestoService,
    PrecioRepuestoPopupService,
    PrecioRepuestoComponent,
    PrecioRepuestoDetailComponent,
    PrecioRepuestoDialogComponent,
    PrecioRepuestoPopupComponent,
    PrecioRepuestoDeletePopupComponent,
    PrecioRepuestoDeleteDialogComponent,
    precioRepuestoRoute,
    precioRepuestoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...precioRepuestoRoute,
    ...precioRepuestoPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PrecioRepuestoComponent,
        PrecioRepuestoDetailComponent,
        PrecioRepuestoDialogComponent,
        PrecioRepuestoDeleteDialogComponent,
        PrecioRepuestoPopupComponent,
        PrecioRepuestoDeletePopupComponent,
    ],
    entryComponents: [
        PrecioRepuestoComponent,
        PrecioRepuestoDialogComponent,
        PrecioRepuestoPopupComponent,
        PrecioRepuestoDeleteDialogComponent,
        PrecioRepuestoDeletePopupComponent,
    ],
    providers: [
        PrecioRepuestoService,
        PrecioRepuestoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetPrecioRepuestoModule {}
