import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    DetalleMovimientoComponent,
    DetalleMovimientoDetailComponent,
    DetalleMovimientoUpdateComponent,
    DetalleMovimientoDeleteDialogComponent,
    detalleMovimientoRoute,
    DetalleMovimientoDeletePopupComponent,
    detalleMovimientoPopupRoute
} from 'app/entities/detalle-movimiento';

const ENTITY_STATES = [...detalleMovimientoRoute, ...detalleMovimientoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DetalleMovimientoComponent,
        DetalleMovimientoDetailComponent,
        DetalleMovimientoDeletePopupComponent,
        DetalleMovimientoUpdateComponent,
        DetalleMovimientoDeleteDialogComponent
    ],
    entryComponents: [DetalleMovimientoComponent, DetalleMovimientoUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetDetalleMovimientoModule {}
