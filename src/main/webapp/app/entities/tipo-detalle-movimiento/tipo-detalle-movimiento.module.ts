import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    TipoDetalleMovimientoService,
    TipoDetalleMovimientoPopupService,
    TipoDetalleMovimientoComponent,
    TipoDetalleMovimientoDetailComponent,
    TipoDetalleMovimientoDialogComponent,
    TipoDetalleMovimientoPopupComponent,
    TipoDetalleMovimientoDeletePopupComponent,
    TipoDetalleMovimientoDeleteDialogComponent,
    tipoDetalleMovimientoRoute,
    tipoDetalleMovimientoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipoDetalleMovimientoRoute,
    ...tipoDetalleMovimientoPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TipoDetalleMovimientoComponent,
        TipoDetalleMovimientoDetailComponent,
        TipoDetalleMovimientoDialogComponent,
        TipoDetalleMovimientoDeleteDialogComponent,
        TipoDetalleMovimientoPopupComponent,
        TipoDetalleMovimientoDeletePopupComponent,
    ],
    entryComponents: [
        TipoDetalleMovimientoComponent,
        TipoDetalleMovimientoDialogComponent,
        TipoDetalleMovimientoPopupComponent,
        TipoDetalleMovimientoDeleteDialogComponent,
        TipoDetalleMovimientoDeletePopupComponent,
    ],
    providers: [
        TipoDetalleMovimientoService,
        TipoDetalleMovimientoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetTipoDetalleMovimientoModule {}
