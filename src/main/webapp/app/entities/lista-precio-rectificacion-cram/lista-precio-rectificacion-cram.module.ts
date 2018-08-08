import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    ListaPrecioRectificacionCRAMComponent,
    ListaPrecioRectificacionCRAMDetailComponent,
    ListaPrecioRectificacionCRAMUpdateComponent,
    ListaPrecioRectificacionCRAMDeletePopupComponent,
    ListaPrecioRectificacionCRAMDeleteDialogComponent,
    listaPrecioRectificacionCRAMRoute,
    listaPrecioRectificacionCRAMPopupRoute
} from './';

const ENTITY_STATES = [...listaPrecioRectificacionCRAMRoute, ...listaPrecioRectificacionCRAMPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ListaPrecioRectificacionCRAMComponent,
        ListaPrecioRectificacionCRAMDetailComponent,
        ListaPrecioRectificacionCRAMUpdateComponent,
        ListaPrecioRectificacionCRAMDeleteDialogComponent,
        ListaPrecioRectificacionCRAMDeletePopupComponent
    ],
    entryComponents: [
        ListaPrecioRectificacionCRAMComponent,
        ListaPrecioRectificacionCRAMUpdateComponent,
        ListaPrecioRectificacionCRAMDeleteDialogComponent,
        ListaPrecioRectificacionCRAMDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetListaPrecioRectificacionCRAMModule {}
