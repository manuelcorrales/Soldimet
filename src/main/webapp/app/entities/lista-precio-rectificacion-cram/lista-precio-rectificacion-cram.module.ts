import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    ListaPrecioRectificacionCRAMService,
    ListaPrecioRectificacionCRAMPopupService,
    ListaPrecioRectificacionCRAMComponent,
    ListaPrecioRectificacionCRAMDetailComponent,
    ListaPrecioRectificacionCRAMDialogComponent,
    ListaPrecioRectificacionCRAMPopupComponent,
    ListaPrecioRectificacionCRAMDeletePopupComponent,
    ListaPrecioRectificacionCRAMDeleteDialogComponent,
    listaPrecioRectificacionCRAMRoute,
    listaPrecioRectificacionCRAMPopupRoute,
} from './';

const ENTITY_STATES = [
    ...listaPrecioRectificacionCRAMRoute,
    ...listaPrecioRectificacionCRAMPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ListaPrecioRectificacionCRAMComponent,
        ListaPrecioRectificacionCRAMDetailComponent,
        ListaPrecioRectificacionCRAMDialogComponent,
        ListaPrecioRectificacionCRAMDeleteDialogComponent,
        ListaPrecioRectificacionCRAMPopupComponent,
        ListaPrecioRectificacionCRAMDeletePopupComponent,
    ],
    entryComponents: [
        ListaPrecioRectificacionCRAMComponent,
        ListaPrecioRectificacionCRAMDialogComponent,
        ListaPrecioRectificacionCRAMPopupComponent,
        ListaPrecioRectificacionCRAMDeleteDialogComponent,
        ListaPrecioRectificacionCRAMDeletePopupComponent,
    ],
    providers: [
        ListaPrecioRectificacionCRAMService,
        ListaPrecioRectificacionCRAMPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetListaPrecioRectificacionCRAMModule {}
