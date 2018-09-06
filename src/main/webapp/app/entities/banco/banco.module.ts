import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    BancoComponent,
    BancoDetailComponent,
    BancoUpdateComponent,
    BancoDeletePopupComponent,
    bancoRoute,
    bancoPopupRoute
} from 'app/entities/banco';

const ENTITY_STATES = [...bancoRoute, ...bancoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [BancoComponent, BancoDetailComponent, BancoUpdateComponent, BancoDeletePopupComponent],
    entryComponents: [BancoComponent, BancoUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetBancoModule {}
