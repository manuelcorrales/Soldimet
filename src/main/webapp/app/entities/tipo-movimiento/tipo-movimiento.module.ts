import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    TipoMovimientoComponent,
    TipoMovimientoDetailComponent,
    TipoMovimientoUpdateComponent,
    TipoMovimientoDeleteDialogComponent,
    TipoMovimientoDeletePopupComponent,
    tipoMovimientoRoute,
    tipoMovimientoPopupRoute
} from 'app/entities/tipo-movimiento';

const ENTITY_STATES = [...tipoMovimientoRoute, ...tipoMovimientoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TipoMovimientoComponent,
        TipoMovimientoDeleteDialogComponent,
        TipoMovimientoDeletePopupComponent,
        TipoMovimientoDetailComponent,
        TipoMovimientoUpdateComponent
    ],
    entryComponents: [TipoMovimientoComponent, TipoMovimientoUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetTipoMovimientoModule {}
