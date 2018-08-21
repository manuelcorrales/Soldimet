import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    CobranzaRepuestoComponent,
    CobranzaRepuestoDetailComponent,
    CobranzaRepuestoUpdateComponent,
    CobranzaRepuestoDeleteDialogComponent,
    CobranzaRepuestoDeletePopupComponent,
    cobranzaRepuestoRoute,
    cobranzaRepuestoPopupRoute
} from './';

const ENTITY_STATES = [...cobranzaRepuestoRoute, ...cobranzaRepuestoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CobranzaRepuestoComponent,
        CobranzaRepuestoDetailComponent,
        CobranzaRepuestoDeletePopupComponent,
        CobranzaRepuestoDeleteDialogComponent,
        CobranzaRepuestoUpdateComponent
    ],
    entryComponents: [CobranzaRepuestoComponent, CobranzaRepuestoUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetCobranzaRepuestoModule {}
