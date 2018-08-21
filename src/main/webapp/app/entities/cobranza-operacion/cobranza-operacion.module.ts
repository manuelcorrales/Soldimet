import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    CobranzaOperacionComponent,
    CobranzaOperacionDetailComponent,
    CobranzaOperacionUpdateComponent,
    CobranzaOperacionDeleteDialogComponent,
    CobranzaOperacionDeletePopupComponent,
    cobranzaOperacionRoute,
    cobranzaOperacionPopupRoute
} from './';

const ENTITY_STATES = [...cobranzaOperacionRoute, ...cobranzaOperacionPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CobranzaOperacionComponent,
        CobranzaOperacionDetailComponent,
        CobranzaOperacionUpdateComponent,
        CobranzaOperacionDeletePopupComponent,
        CobranzaOperacionDeleteDialogComponent
    ],
    entryComponents: [CobranzaOperacionComponent, CobranzaOperacionUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetCobranzaOperacionModule {}
