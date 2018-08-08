import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    TipoMovimientoComponent,
    TipoMovimientoDetailComponent,
    TipoMovimientoUpdateComponent,
    TipoMovimientoDeletePopupComponent,
    TipoMovimientoDeleteDialogComponent,
    tipoMovimientoRoute,
    tipoMovimientoPopupRoute
} from './';

const ENTITY_STATES = [...tipoMovimientoRoute, ...tipoMovimientoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TipoMovimientoComponent,
        TipoMovimientoDetailComponent,
        TipoMovimientoUpdateComponent,
        TipoMovimientoDeleteDialogComponent,
        TipoMovimientoDeletePopupComponent
    ],
    entryComponents: [
        TipoMovimientoComponent,
        TipoMovimientoUpdateComponent,
        TipoMovimientoDeleteDialogComponent,
        TipoMovimientoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetTipoMovimientoModule {}
