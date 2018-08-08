import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    TipoTarjetaComponent,
    TipoTarjetaDetailComponent,
    TipoTarjetaUpdateComponent,
    TipoTarjetaDeletePopupComponent,
    TipoTarjetaDeleteDialogComponent,
    tipoTarjetaRoute,
    tipoTarjetaPopupRoute
} from './';

const ENTITY_STATES = [...tipoTarjetaRoute, ...tipoTarjetaPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TipoTarjetaComponent,
        TipoTarjetaDetailComponent,
        TipoTarjetaUpdateComponent,
        TipoTarjetaDeleteDialogComponent,
        TipoTarjetaDeletePopupComponent
    ],
    entryComponents: [TipoTarjetaComponent, TipoTarjetaUpdateComponent, TipoTarjetaDeleteDialogComponent, TipoTarjetaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetTipoTarjetaModule {}
