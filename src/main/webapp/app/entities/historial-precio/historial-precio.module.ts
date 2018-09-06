import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    HistorialPrecioComponent,
    HistorialPrecioDetailComponent,
    HistorialPrecioUpdateComponent,
    HistorialPrecioDeleteDialogComponent,
    HistorialPrecioDeletePopupComponent,
    historialPrecioRoute,
    historialPrecioPopupRoute
} from 'app/entities/historial-precio';

const ENTITY_STATES = [...historialPrecioRoute, ...historialPrecioPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        HistorialPrecioComponent,
        HistorialPrecioDeleteDialogComponent,
        HistorialPrecioDeletePopupComponent,
        HistorialPrecioDetailComponent,
        HistorialPrecioUpdateComponent
    ],
    entryComponents: [HistorialPrecioComponent, HistorialPrecioUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetHistorialPrecioModule {}
