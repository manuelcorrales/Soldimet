import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    TipoRepuestoService,
    TipoRepuestoPopupService,
    TipoRepuestoComponent,
    TipoRepuestoDetailComponent,
    TipoRepuestoDialogComponent,
    TipoRepuestoPopupComponent,
    TipoRepuestoDeletePopupComponent,
    TipoRepuestoDeleteDialogComponent,
    tipoRepuestoRoute,
    tipoRepuestoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipoRepuestoRoute,
    ...tipoRepuestoPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TipoRepuestoComponent,
        TipoRepuestoDetailComponent,
        TipoRepuestoDialogComponent,
        TipoRepuestoDeleteDialogComponent,
        TipoRepuestoPopupComponent,
        TipoRepuestoDeletePopupComponent,
    ],
    entryComponents: [
        TipoRepuestoComponent,
        TipoRepuestoDialogComponent,
        TipoRepuestoPopupComponent,
        TipoRepuestoDeleteDialogComponent,
        TipoRepuestoDeletePopupComponent,
    ],
    providers: [
        TipoRepuestoService,
        TipoRepuestoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetTipoRepuestoModule {}
