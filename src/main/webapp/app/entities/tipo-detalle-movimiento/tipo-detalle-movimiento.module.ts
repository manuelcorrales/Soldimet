import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    TipoDetalleMovimientoComponent,
    TipoDetalleMovimientoDetailComponent,
    TipoDetalleMovimientoUpdateComponent,
    TipoDetalleMovimientoDeleteDialogComponent,
    TipoDetalleMovimientoDeletePopupComponent,
    tipoDetalleMovimientoRoute,
    tipoDetalleMovimientoPopupRoute
} from './';

const ENTITY_STATES = [...tipoDetalleMovimientoRoute, ...tipoDetalleMovimientoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TipoDetalleMovimientoComponent,
        TipoDetalleMovimientoDeleteDialogComponent,
        TipoDetalleMovimientoDeletePopupComponent,
        TipoDetalleMovimientoDetailComponent,
        TipoDetalleMovimientoUpdateComponent
    ],
    entryComponents: [TipoDetalleMovimientoComponent, TipoDetalleMovimientoUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetTipoDetalleMovimientoModule {}
