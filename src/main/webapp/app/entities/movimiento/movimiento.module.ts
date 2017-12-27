import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    MovimientoService,
    MovimientoPopupService,
    MovimientoComponent,
    MovimientoDetailComponent,
    MovimientoDialogComponent,
    MovimientoPopupComponent,
    MovimientoDeletePopupComponent,
    MovimientoDeleteDialogComponent,
    movimientoRoute,
    movimientoPopupRoute,
    MovimientoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...movimientoRoute,
    ...movimientoPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MovimientoComponent,
        MovimientoDetailComponent,
        MovimientoDialogComponent,
        MovimientoDeleteDialogComponent,
        MovimientoPopupComponent,
        MovimientoDeletePopupComponent,
    ],
    entryComponents: [
        MovimientoComponent,
        MovimientoDialogComponent,
        MovimientoPopupComponent,
        MovimientoDeleteDialogComponent,
        MovimientoDeletePopupComponent,
    ],
    providers: [
        MovimientoService,
        MovimientoPopupService,
        MovimientoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetMovimientoModule {}
