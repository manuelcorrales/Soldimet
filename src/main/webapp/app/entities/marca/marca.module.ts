import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    MarcaService,
    MarcaPopupService,
    MarcaComponent,
    MarcaDetailComponent,
    MarcaDialogComponent,
    MarcaPopupComponent,
    MarcaDeletePopupComponent,
    MarcaDeleteDialogComponent,
    marcaRoute,
    marcaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...marcaRoute,
    ...marcaPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MarcaComponent,
        MarcaDetailComponent,
        MarcaDialogComponent,
        MarcaDeleteDialogComponent,
        MarcaPopupComponent,
        MarcaDeletePopupComponent,
    ],
    entryComponents: [
        MarcaComponent,
        MarcaDialogComponent,
        MarcaPopupComponent,
        MarcaDeleteDialogComponent,
        MarcaDeletePopupComponent,
    ],
    providers: [
        MarcaService,
        MarcaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetMarcaModule {}
