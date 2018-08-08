import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    HistorialPrecioComponent,
    HistorialPrecioDetailComponent,
    HistorialPrecioUpdateComponent,
    HistorialPrecioDeletePopupComponent,
    HistorialPrecioDeleteDialogComponent,
    historialPrecioRoute,
    historialPrecioPopupRoute
} from './';

const ENTITY_STATES = [...historialPrecioRoute, ...historialPrecioPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HistorialPrecioComponent,
        HistorialPrecioDetailComponent,
        HistorialPrecioUpdateComponent,
        HistorialPrecioDeleteDialogComponent,
        HistorialPrecioDeletePopupComponent
    ],
    entryComponents: [
        HistorialPrecioComponent,
        HistorialPrecioUpdateComponent,
        HistorialPrecioDeleteDialogComponent,
        HistorialPrecioDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetHistorialPrecioModule {}
