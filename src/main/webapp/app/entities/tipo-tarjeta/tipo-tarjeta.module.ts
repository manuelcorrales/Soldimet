import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    TipoTarjetaService,
    TipoTarjetaPopupService,
    TipoTarjetaComponent,
    TipoTarjetaDetailComponent,
    TipoTarjetaDialogComponent,
    TipoTarjetaPopupComponent,
    TipoTarjetaDeletePopupComponent,
    TipoTarjetaDeleteDialogComponent,
    tipoTarjetaRoute,
    tipoTarjetaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipoTarjetaRoute,
    ...tipoTarjetaPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TipoTarjetaComponent,
        TipoTarjetaDetailComponent,
        TipoTarjetaDialogComponent,
        TipoTarjetaDeleteDialogComponent,
        TipoTarjetaPopupComponent,
        TipoTarjetaDeletePopupComponent,
    ],
    entryComponents: [
        TipoTarjetaComponent,
        TipoTarjetaDialogComponent,
        TipoTarjetaPopupComponent,
        TipoTarjetaDeleteDialogComponent,
        TipoTarjetaDeletePopupComponent,
    ],
    providers: [
        TipoTarjetaService,
        TipoTarjetaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetTipoTarjetaModule {}
