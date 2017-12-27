import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    PagoTarjetaService,
    PagoTarjetaPopupService,
    PagoTarjetaComponent,
    PagoTarjetaDetailComponent,
    PagoTarjetaDialogComponent,
    PagoTarjetaPopupComponent,
    PagoTarjetaDeletePopupComponent,
    PagoTarjetaDeleteDialogComponent,
    pagoTarjetaRoute,
    pagoTarjetaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...pagoTarjetaRoute,
    ...pagoTarjetaPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PagoTarjetaComponent,
        PagoTarjetaDetailComponent,
        PagoTarjetaDialogComponent,
        PagoTarjetaDeleteDialogComponent,
        PagoTarjetaPopupComponent,
        PagoTarjetaDeletePopupComponent,
    ],
    entryComponents: [
        PagoTarjetaComponent,
        PagoTarjetaDialogComponent,
        PagoTarjetaPopupComponent,
        PagoTarjetaDeleteDialogComponent,
        PagoTarjetaDeletePopupComponent,
    ],
    providers: [
        PagoTarjetaService,
        PagoTarjetaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetPagoTarjetaModule {}
