import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    CajaService,
    CajaPopupService,
    CajaComponent,
    CajaDetailComponent,
    CajaDialogComponent,
    CajaPopupComponent,
    CajaDeletePopupComponent,
    CajaDeleteDialogComponent,
    cajaRoute,
    cajaPopupRoute,
    CajaResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...cajaRoute,
    ...cajaPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CajaComponent,
        CajaDetailComponent,
        CajaDialogComponent,
        CajaDeleteDialogComponent,
        CajaPopupComponent,
        CajaDeletePopupComponent,
    ],
    entryComponents: [
        CajaComponent,
        CajaDialogComponent,
        CajaPopupComponent,
        CajaDeleteDialogComponent,
        CajaDeletePopupComponent,
    ],
    providers: [
        CajaService,
        CajaPopupService,
        CajaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetCajaModule {}
