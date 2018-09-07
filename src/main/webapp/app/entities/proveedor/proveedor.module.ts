import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    ProveedorComponent,
    ProveedorDetailComponent,
    ProveedorUpdateComponent,
    ProveedorDeleteDialogComponent,
    ProveedorDeletePopupComponent,
    proveedorRoute,
    proveedorPopupRoute
} from 'app/entities/proveedor';

const ENTITY_STATES = [...proveedorRoute, ...proveedorPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProveedorComponent,
        ProveedorDeleteDialogComponent,
        ProveedorDeletePopupComponent,
        ProveedorDetailComponent,
        ProveedorUpdateComponent
    ],
    entryComponents: [ProveedorComponent, ProveedorUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetProveedorModule {}
