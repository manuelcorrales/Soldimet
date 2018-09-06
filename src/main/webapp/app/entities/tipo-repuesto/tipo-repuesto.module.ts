import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    TipoRepuestoComponent,
    TipoRepuestoDetailComponent,
    TipoRepuestoUpdateComponent,
    TipoRepuestoDeleteDialogComponent,
    TipoRepuestoDeletePopupComponent,
    tipoRepuestoRoute,
    tipoRepuestoPopupRoute
} from 'app/entities/tipo-repuesto';

const ENTITY_STATES = [...tipoRepuestoRoute, ...tipoRepuestoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TipoRepuestoComponent,
        TipoRepuestoDetailComponent,
        TipoRepuestoDeleteDialogComponent,
        TipoRepuestoDeletePopupComponent,
        TipoRepuestoUpdateComponent
    ],
    entryComponents: [TipoRepuestoComponent, TipoRepuestoUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetTipoRepuestoModule {}
