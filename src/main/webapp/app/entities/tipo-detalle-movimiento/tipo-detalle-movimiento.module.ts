import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    TipoDetalleMovimientoComponent,
    TipoDetalleMovimientoDetailComponent,
    TipoDetalleMovimientoUpdateComponent,
    TipoDetalleMovimientoDeletePopupComponent,
    TipoDetalleMovimientoDeleteDialogComponent,
    tipoDetalleMovimientoRoute,
    tipoDetalleMovimientoPopupRoute
} from './';

const ENTITY_STATES = [...tipoDetalleMovimientoRoute, ...tipoDetalleMovimientoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TipoDetalleMovimientoComponent,
        TipoDetalleMovimientoDetailComponent,
        TipoDetalleMovimientoUpdateComponent,
        TipoDetalleMovimientoDeleteDialogComponent,
        TipoDetalleMovimientoDeletePopupComponent
    ],
    entryComponents: [
        TipoDetalleMovimientoComponent,
        TipoDetalleMovimientoUpdateComponent,
        TipoDetalleMovimientoDeleteDialogComponent,
        TipoDetalleMovimientoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetTipoDetalleMovimientoModule {}
