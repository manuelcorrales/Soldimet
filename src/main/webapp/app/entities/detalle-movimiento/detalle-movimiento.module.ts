import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    DetalleMovimientoService,
    DetalleMovimientoPopupService,
    DetalleMovimientoComponent,
    DetalleMovimientoDetailComponent,
    DetalleMovimientoDialogComponent,
    DetalleMovimientoPopupComponent,
    DetalleMovimientoDeletePopupComponent,
    DetalleMovimientoDeleteDialogComponent,
    detalleMovimientoRoute,
    detalleMovimientoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...detalleMovimientoRoute,
    ...detalleMovimientoPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DetalleMovimientoComponent,
        DetalleMovimientoDetailComponent,
        DetalleMovimientoDialogComponent,
        DetalleMovimientoDeleteDialogComponent,
        DetalleMovimientoPopupComponent,
        DetalleMovimientoDeletePopupComponent,
    ],
    entryComponents: [
        DetalleMovimientoComponent,
        DetalleMovimientoDialogComponent,
        DetalleMovimientoPopupComponent,
        DetalleMovimientoDeleteDialogComponent,
        DetalleMovimientoDeletePopupComponent,
    ],
    providers: [
        DetalleMovimientoService,
        DetalleMovimientoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetDetalleMovimientoModule {}
