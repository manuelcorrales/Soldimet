import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    CobranzaOperacionService,
    CobranzaOperacionPopupService,
    CobranzaOperacionComponent,
    CobranzaOperacionDetailComponent,
    CobranzaOperacionDialogComponent,
    CobranzaOperacionPopupComponent,
    CobranzaOperacionDeletePopupComponent,
    CobranzaOperacionDeleteDialogComponent,
    cobranzaOperacionRoute,
    cobranzaOperacionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cobranzaOperacionRoute,
    ...cobranzaOperacionPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CobranzaOperacionComponent,
        CobranzaOperacionDetailComponent,
        CobranzaOperacionDialogComponent,
        CobranzaOperacionDeleteDialogComponent,
        CobranzaOperacionPopupComponent,
        CobranzaOperacionDeletePopupComponent,
    ],
    entryComponents: [
        CobranzaOperacionComponent,
        CobranzaOperacionDialogComponent,
        CobranzaOperacionPopupComponent,
        CobranzaOperacionDeleteDialogComponent,
        CobranzaOperacionDeletePopupComponent,
    ],
    providers: [
        CobranzaOperacionService,
        CobranzaOperacionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetCobranzaOperacionModule {}
