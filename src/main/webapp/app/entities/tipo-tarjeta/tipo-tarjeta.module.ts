import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    TipoTarjetaComponent,
    TipoTarjetaDetailComponent,
    TipoTarjetaUpdateComponent,
    tipoTarjetaRoute,
    tipoTarjetaPopupRoute
} from 'app/entities/tipo-tarjeta';
import {
    TipoTarjetaDeleteDialogComponent,
    TipoTarjetaDeletePopupComponent
} from 'app/entities/tipo-tarjeta/tipo-tarjeta-delete-dialog.component';

const ENTITY_STATES = [...tipoTarjetaRoute, ...tipoTarjetaPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TipoTarjetaComponent,
        TipoTarjetaDetailComponent,
        TipoTarjetaDeleteDialogComponent,
        TipoTarjetaDeletePopupComponent,
        TipoTarjetaUpdateComponent
    ],
    entryComponents: [TipoTarjetaComponent, TipoTarjetaUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetTipoTarjetaModule {}
