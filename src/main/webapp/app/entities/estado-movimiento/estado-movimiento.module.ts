import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    EstadoMovimientoService,
    EstadoMovimientoPopupService,
    EstadoMovimientoComponent,
    EstadoMovimientoDetailComponent,
    EstadoMovimientoDialogComponent,
    EstadoMovimientoPopupComponent,
    EstadoMovimientoDeletePopupComponent,
    EstadoMovimientoDeleteDialogComponent,
    estadoMovimientoRoute,
    estadoMovimientoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...estadoMovimientoRoute,
    ...estadoMovimientoPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        EstadoMovimientoComponent,
        EstadoMovimientoDetailComponent,
        EstadoMovimientoDialogComponent,
        EstadoMovimientoDeleteDialogComponent,
        EstadoMovimientoPopupComponent,
        EstadoMovimientoDeletePopupComponent,
    ],
    entryComponents: [
        EstadoMovimientoComponent,
        EstadoMovimientoDialogComponent,
        EstadoMovimientoPopupComponent,
        EstadoMovimientoDeleteDialogComponent,
        EstadoMovimientoDeletePopupComponent,
    ],
    providers: [
        EstadoMovimientoService,
        EstadoMovimientoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetEstadoMovimientoModule {}
