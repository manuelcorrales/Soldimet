import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    TipoMovimientoService,
    TipoMovimientoPopupService,
    TipoMovimientoComponent,
    TipoMovimientoDetailComponent,
    TipoMovimientoDialogComponent,
    TipoMovimientoPopupComponent,
    TipoMovimientoDeletePopupComponent,
    TipoMovimientoDeleteDialogComponent,
    tipoMovimientoRoute,
    tipoMovimientoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipoMovimientoRoute,
    ...tipoMovimientoPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TipoMovimientoComponent,
        TipoMovimientoDetailComponent,
        TipoMovimientoDialogComponent,
        TipoMovimientoDeleteDialogComponent,
        TipoMovimientoPopupComponent,
        TipoMovimientoDeletePopupComponent,
    ],
    entryComponents: [
        TipoMovimientoComponent,
        TipoMovimientoDialogComponent,
        TipoMovimientoPopupComponent,
        TipoMovimientoDeleteDialogComponent,
        TipoMovimientoDeletePopupComponent,
    ],
    providers: [
        TipoMovimientoService,
        TipoMovimientoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetTipoMovimientoModule {}
