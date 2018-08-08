import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    TipoRepuestoComponent,
    TipoRepuestoDetailComponent,
    TipoRepuestoUpdateComponent,
    TipoRepuestoDeletePopupComponent,
    TipoRepuestoDeleteDialogComponent,
    tipoRepuestoRoute,
    tipoRepuestoPopupRoute
} from './';

const ENTITY_STATES = [...tipoRepuestoRoute, ...tipoRepuestoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TipoRepuestoComponent,
        TipoRepuestoDetailComponent,
        TipoRepuestoUpdateComponent,
        TipoRepuestoDeleteDialogComponent,
        TipoRepuestoDeletePopupComponent
    ],
    entryComponents: [
        TipoRepuestoComponent,
        TipoRepuestoUpdateComponent,
        TipoRepuestoDeleteDialogComponent,
        TipoRepuestoDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetTipoRepuestoModule {}
