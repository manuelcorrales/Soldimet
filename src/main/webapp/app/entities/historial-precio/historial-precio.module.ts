import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    HistorialPrecioService,
    HistorialPrecioPopupService,
    HistorialPrecioComponent,
    HistorialPrecioDetailComponent,
    HistorialPrecioDialogComponent,
    HistorialPrecioPopupComponent,
    HistorialPrecioDeletePopupComponent,
    HistorialPrecioDeleteDialogComponent,
    historialPrecioRoute,
    historialPrecioPopupRoute,
} from './';

const ENTITY_STATES = [
    ...historialPrecioRoute,
    ...historialPrecioPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        HistorialPrecioComponent,
        HistorialPrecioDetailComponent,
        HistorialPrecioDialogComponent,
        HistorialPrecioDeleteDialogComponent,
        HistorialPrecioPopupComponent,
        HistorialPrecioDeletePopupComponent,
    ],
    entryComponents: [
        HistorialPrecioComponent,
        HistorialPrecioDialogComponent,
        HistorialPrecioPopupComponent,
        HistorialPrecioDeleteDialogComponent,
        HistorialPrecioDeletePopupComponent,
    ],
    providers: [
        HistorialPrecioService,
        HistorialPrecioPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetHistorialPrecioModule {}
