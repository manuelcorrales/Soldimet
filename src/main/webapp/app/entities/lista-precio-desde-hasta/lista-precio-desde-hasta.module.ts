import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    ListaPrecioDesdeHastaComponent,
    ListaPrecioDesdeHastaDetailComponent,
    ListaPrecioDesdeHastaUpdateComponent,
    ListaPrecioDesdeHastaDeletePopupComponent,
    ListaPrecioDesdeHastaDeleteDialogComponent,
    listaPrecioDesdeHastaRoute,
    listaPrecioDesdeHastaPopupRoute
} from './';

const ENTITY_STATES = [...listaPrecioDesdeHastaRoute, ...listaPrecioDesdeHastaPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ListaPrecioDesdeHastaComponent,
        ListaPrecioDesdeHastaDetailComponent,
        ListaPrecioDesdeHastaUpdateComponent,
        ListaPrecioDesdeHastaDeleteDialogComponent,
        ListaPrecioDesdeHastaDeletePopupComponent
    ],
    entryComponents: [
        ListaPrecioDesdeHastaComponent,
        ListaPrecioDesdeHastaUpdateComponent,
        ListaPrecioDesdeHastaDeleteDialogComponent,
        ListaPrecioDesdeHastaDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetListaPrecioDesdeHastaModule {}
