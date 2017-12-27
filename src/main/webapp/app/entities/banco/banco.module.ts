import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    BancoService,
    BancoPopupService,
    BancoComponent,
    BancoDetailComponent,
    BancoDialogComponent,
    BancoPopupComponent,
    BancoDeletePopupComponent,
    BancoDeleteDialogComponent,
    bancoRoute,
    bancoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...bancoRoute,
    ...bancoPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        BancoComponent,
        BancoDetailComponent,
        BancoDialogComponent,
        BancoDeleteDialogComponent,
        BancoPopupComponent,
        BancoDeletePopupComponent,
    ],
    entryComponents: [
        BancoComponent,
        BancoDialogComponent,
        BancoPopupComponent,
        BancoDeleteDialogComponent,
        BancoDeletePopupComponent,
    ],
    providers: [
        BancoService,
        BancoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetBancoModule {}
