import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    TarjetaComponent,
    TarjetaDetailComponent,
    TarjetaUpdateComponent,
    TarjetaDeleteDialogComponent,
    TarjetaDeletePopupComponent,
    tarjetaRoute,
    tarjetaPopupRoute
} from './';

const ENTITY_STATES = [...tarjetaRoute, ...tarjetaPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TarjetaComponent,
        TarjetaDeleteDialogComponent,
        TarjetaDeletePopupComponent,
        TarjetaDetailComponent,
        TarjetaUpdateComponent
    ],
    entryComponents: [TarjetaComponent, TarjetaUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetTarjetaModule {}
