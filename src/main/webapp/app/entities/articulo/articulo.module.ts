import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    ArticuloService,
    ArticuloPopupService,
    ArticuloComponent,
    ArticuloDetailComponent,
    ArticuloDialogComponent,
    ArticuloPopupComponent,
    ArticuloDeletePopupComponent,
    ArticuloDeleteDialogComponent,
    articuloRoute,
    articuloPopupRoute,
    ArticuloResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...articuloRoute,
    ...articuloPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ArticuloComponent,
        ArticuloDetailComponent,
        ArticuloDialogComponent,
        ArticuloDeleteDialogComponent,
        ArticuloPopupComponent,
        ArticuloDeletePopupComponent,
    ],
    entryComponents: [
        ArticuloComponent,
        ArticuloDialogComponent,
        ArticuloPopupComponent,
        ArticuloDeleteDialogComponent,
        ArticuloDeletePopupComponent,
    ],
    providers: [
        ArticuloService,
        ArticuloPopupService,
        ArticuloResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetArticuloModule {}
