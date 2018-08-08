import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    PagoTarjetaComponent,
    PagoTarjetaDetailComponent,
    PagoTarjetaUpdateComponent,
    PagoTarjetaDeletePopupComponent,
    PagoTarjetaDeleteDialogComponent,
    pagoTarjetaRoute,
    pagoTarjetaPopupRoute
} from './';

const ENTITY_STATES = [...pagoTarjetaRoute, ...pagoTarjetaPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PagoTarjetaComponent,
        PagoTarjetaDetailComponent,
        PagoTarjetaUpdateComponent,
        PagoTarjetaDeleteDialogComponent,
        PagoTarjetaDeletePopupComponent
    ],
    entryComponents: [PagoTarjetaComponent, PagoTarjetaUpdateComponent, PagoTarjetaDeleteDialogComponent, PagoTarjetaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetPagoTarjetaModule {}
