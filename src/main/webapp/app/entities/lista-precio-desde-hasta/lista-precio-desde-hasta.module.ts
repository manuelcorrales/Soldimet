import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    ListaPrecioDesdeHastaComponent,
    ListaPrecioDesdeHastaDetailComponent,
    ListaPrecioDesdeHastaDeleteDialogComponent,
    ListaPrecioDesdeHastaDeletePopupComponent,
    ListaPrecioDesdeHastaUpdateComponent,
    listaPrecioDesdeHastaRoute,
    listaPrecioDesdeHastaPopupRoute
} from 'app/entities/lista-precio-desde-hasta';

const ENTITY_STATES = [...listaPrecioDesdeHastaRoute, ...listaPrecioDesdeHastaPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ListaPrecioDesdeHastaComponent,
        ListaPrecioDesdeHastaDeleteDialogComponent,
        ListaPrecioDesdeHastaDeletePopupComponent,
        ListaPrecioDesdeHastaDetailComponent,
        ListaPrecioDesdeHastaUpdateComponent
    ],
    entryComponents: [ListaPrecioDesdeHastaComponent, ListaPrecioDesdeHastaUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetListaPrecioDesdeHastaModule {}
