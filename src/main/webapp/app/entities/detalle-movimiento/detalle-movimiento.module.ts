import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    DetalleMovimientoComponent,
    DetalleMovimientoDetailComponent,
    DetalleMovimientoUpdateComponent,
    DetalleMovimientoDeletePopupComponent,
    DetalleMovimientoDeleteDialogComponent,
    detalleMovimientoRoute,
    detalleMovimientoPopupRoute
} from 'app/entities/detalle-movimiento';

const ENTITY_STATES = [...detalleMovimientoRoute, ...detalleMovimientoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DetalleMovimientoComponent,
        DetalleMovimientoDetailComponent,
        DetalleMovimientoUpdateComponent,
        DetalleMovimientoDeleteDialogComponent,
        DetalleMovimientoDeletePopupComponent
    ],
    entryComponents: [
        DetalleMovimientoComponent,
        DetalleMovimientoUpdateComponent,
        DetalleMovimientoDeleteDialogComponent,
        DetalleMovimientoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetDetalleMovimientoModule {}
