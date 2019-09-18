import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    MedioDePagoTarjetaComponent,
    MedioDePagoTarjetaDetailComponent,
    MedioDePagoTarjetaUpdateComponent,
    MedioDePagoTarjetaDeletePopupComponent,
    MedioDePagoTarjetaDeleteDialogComponent,
    medioDePagoTarjetaRoute,
    medioDePagoTarjetaPopupRoute
} from 'app/entities/medio-de-pago-tarjeta';

const ENTITY_STATES = [...medioDePagoTarjetaRoute, ...medioDePagoTarjetaPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MedioDePagoTarjetaComponent,
        MedioDePagoTarjetaDetailComponent,
        MedioDePagoTarjetaUpdateComponent,
        MedioDePagoTarjetaDeleteDialogComponent,
        MedioDePagoTarjetaDeletePopupComponent
    ],
    entryComponents: [
        MedioDePagoTarjetaComponent,
        MedioDePagoTarjetaUpdateComponent,
        MedioDePagoTarjetaDeleteDialogComponent,
        MedioDePagoTarjetaDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetMedioDePagoTarjetaModule {}
