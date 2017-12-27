import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    TarjetaService,
    TarjetaPopupService,
    TarjetaComponent,
    TarjetaDetailComponent,
    TarjetaDialogComponent,
    TarjetaPopupComponent,
    TarjetaDeletePopupComponent,
    TarjetaDeleteDialogComponent,
    tarjetaRoute,
    tarjetaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tarjetaRoute,
    ...tarjetaPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TarjetaComponent,
        TarjetaDetailComponent,
        TarjetaDialogComponent,
        TarjetaDeleteDialogComponent,
        TarjetaPopupComponent,
        TarjetaDeletePopupComponent,
    ],
    entryComponents: [
        TarjetaComponent,
        TarjetaDialogComponent,
        TarjetaPopupComponent,
        TarjetaDeleteDialogComponent,
        TarjetaDeletePopupComponent,
    ],
    providers: [
        TarjetaService,
        TarjetaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetTarjetaModule {}
