import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    ProveedorComponent,
    ProveedorDetailComponent,
    ProveedorUpdateComponent,
    ProveedorDeletePopupComponent,
    ProveedorDeleteDialogComponent,
    proveedorRoute,
    proveedorPopupRoute
} from './';

const ENTITY_STATES = [...proveedorRoute, ...proveedorPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProveedorComponent,
        ProveedorDetailComponent,
        ProveedorUpdateComponent,
        ProveedorDeleteDialogComponent,
        ProveedorDeletePopupComponent
    ],
    entryComponents: [ProveedorComponent, ProveedorUpdateComponent, ProveedorDeleteDialogComponent, ProveedorDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetProveedorModule {}
