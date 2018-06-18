import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    CobranzaRepuestoService,
    CobranzaRepuestoPopupService,
    CobranzaRepuestoComponent,
    CobranzaRepuestoDetailComponent,
    CobranzaRepuestoDialogComponent,
    CobranzaRepuestoPopupComponent,
    CobranzaRepuestoDeletePopupComponent,
    CobranzaRepuestoDeleteDialogComponent,
    cobranzaRepuestoRoute,
    cobranzaRepuestoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cobranzaRepuestoRoute,
    ...cobranzaRepuestoPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CobranzaRepuestoComponent,
        CobranzaRepuestoDetailComponent,
        CobranzaRepuestoDialogComponent,
        CobranzaRepuestoDeleteDialogComponent,
        CobranzaRepuestoPopupComponent,
        CobranzaRepuestoDeletePopupComponent,
    ],
    entryComponents: [
        CobranzaRepuestoComponent,
        CobranzaRepuestoDialogComponent,
        CobranzaRepuestoPopupComponent,
        CobranzaRepuestoDeleteDialogComponent,
        CobranzaRepuestoDeletePopupComponent,
    ],
    providers: [
        CobranzaRepuestoService,
        CobranzaRepuestoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetCobranzaRepuestoModule {}
