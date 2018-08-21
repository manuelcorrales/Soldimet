import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    MarcaComponent,
    MarcaDetailComponent,
    MarcaUpdateComponent,
    MarcaDeleteDialogComponent,
    MarcaDeletePopupComponent,
    marcaRoute,
    marcaPopupRoute
} from './';

const ENTITY_STATES = [...marcaRoute, ...marcaPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [MarcaComponent, MarcaDetailComponent, MarcaDeleteDialogComponent, MarcaDeletePopupComponent, MarcaUpdateComponent],
    entryComponents: [MarcaComponent, MarcaUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetMarcaModule {}
