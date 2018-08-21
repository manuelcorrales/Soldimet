import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    ArticuloComponent,
    ArticuloDetailComponent,
    ArticuloUpdateComponent,
    ArticuloDeletePopupComponent,
    articuloRoute,
    articuloPopupRoute,
    ArticuloDeleteDialogComponent
} from './';

const ENTITY_STATES = [...articuloRoute, ...articuloPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ArticuloComponent,
        ArticuloDetailComponent,
        ArticuloDeletePopupComponent,
        ArticuloUpdateComponent,
        ArticuloDeleteDialogComponent
    ],
    entryComponents: [ArticuloComponent, ArticuloUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetArticuloModule {}
