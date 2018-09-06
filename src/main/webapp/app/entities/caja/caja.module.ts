import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    CajaComponent,
    CajaDetailComponent,
    CajaUpdateComponent,
    CajaDeleteDialogComponent,
    CajaDeletePopupComponent,
    cajaRoute,
    cajaPopupRoute
} from 'app/entities/caja';

const ENTITY_STATES = [...cajaRoute, ...cajaPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [CajaComponent, CajaDetailComponent, CajaUpdateComponent, CajaDeleteDialogComponent, CajaDeletePopupComponent],
    entryComponents: [CajaComponent, CajaUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetCajaModule {}
