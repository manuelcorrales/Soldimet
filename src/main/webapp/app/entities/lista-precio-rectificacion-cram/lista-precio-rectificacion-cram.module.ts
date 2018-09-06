import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    ListaPrecioRectificacionCRAMComponent,
    ListaPrecioRectificacionCRAMDetailComponent,
    ListaPrecioRectificacionCRAMUpdateComponent,
    ListaPrecioRectificacionCRAMDeleteDialogComponent,
    ListaPrecioRectificacionCRAMDeletePopupComponent,
    listaPrecioRectificacionCRAMRoute,
    listaPrecioRectificacionCRAMPopupRoute
} from 'app/entities/lista-precio-rectificacion-cram';

const ENTITY_STATES = [...listaPrecioRectificacionCRAMRoute, ...listaPrecioRectificacionCRAMPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ListaPrecioRectificacionCRAMComponent,
        ListaPrecioRectificacionCRAMDeleteDialogComponent,
        ListaPrecioRectificacionCRAMDeletePopupComponent,
        ListaPrecioRectificacionCRAMDetailComponent,
        ListaPrecioRectificacionCRAMUpdateComponent
    ],
    entryComponents: [ListaPrecioRectificacionCRAMComponent, ListaPrecioRectificacionCRAMUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetListaPrecioRectificacionCRAMModule {}
