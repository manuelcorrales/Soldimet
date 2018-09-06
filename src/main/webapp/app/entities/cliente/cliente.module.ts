import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    ClienteComponent,
    ClienteDetailComponent,
    ClienteUpdateComponent,
    ClienteDeleteDialogComponent,
    ClienteDeletePopupComponent,
    clienteRoute,
    clientePopupRoute
} from 'app/entities/cliente';

const ENTITY_STATES = [...clienteRoute, ...clientePopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ClienteComponent,
        ClienteDetailComponent,
        ClienteDeletePopupComponent,
        ClienteUpdateComponent,
        ClienteDeleteDialogComponent
    ],
    entryComponents: [ClienteComponent, ClienteUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetClienteModule {}
