import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    EmpleadoComponent,
    EmpleadoDetailComponent,
    EmpleadoUpdateComponent,
    EmpleadoDeleteDialogComponent,
    empleadoRoute,
    EmpleadoDeletePopupComponent,
    empleadoPopupRoute
} from './';

const ENTITY_STATES = [...empleadoRoute, ...empleadoPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EmpleadoComponent,
        EmpleadoDeletePopupComponent,
        EmpleadoDetailComponent,
        EmpleadoDeleteDialogComponent,
        EmpleadoUpdateComponent
    ],
    entryComponents: [EmpleadoComponent, EmpleadoUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetEmpleadoModule {}
