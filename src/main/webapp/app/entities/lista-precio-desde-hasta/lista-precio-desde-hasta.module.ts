import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    ListaPrecioDesdeHastaService,
    ListaPrecioDesdeHastaPopupService,
    ListaPrecioDesdeHastaComponent,
    ListaPrecioDesdeHastaDetailComponent,
    ListaPrecioDesdeHastaDialogComponent,
    ListaPrecioDesdeHastaPopupComponent,
    ListaPrecioDesdeHastaDeletePopupComponent,
    ListaPrecioDesdeHastaDeleteDialogComponent,
    listaPrecioDesdeHastaRoute,
    listaPrecioDesdeHastaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...listaPrecioDesdeHastaRoute,
    ...listaPrecioDesdeHastaPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ListaPrecioDesdeHastaComponent,
        ListaPrecioDesdeHastaDetailComponent,
        ListaPrecioDesdeHastaDialogComponent,
        ListaPrecioDesdeHastaDeleteDialogComponent,
        ListaPrecioDesdeHastaPopupComponent,
        ListaPrecioDesdeHastaDeletePopupComponent,
    ],
    entryComponents: [
        ListaPrecioDesdeHastaComponent,
        ListaPrecioDesdeHastaDialogComponent,
        ListaPrecioDesdeHastaPopupComponent,
        ListaPrecioDesdeHastaDeleteDialogComponent,
        ListaPrecioDesdeHastaDeletePopupComponent,
    ],
    providers: [
        ListaPrecioDesdeHastaService,
        ListaPrecioDesdeHastaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetListaPrecioDesdeHastaModule {}
