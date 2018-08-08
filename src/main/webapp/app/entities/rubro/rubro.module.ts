import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    RubroComponent,
    RubroDetailComponent,
    RubroUpdateComponent,
    RubroDeletePopupComponent,
    RubroDeleteDialogComponent,
    rubroRoute,
    rubroPopupRoute
} from './';

const ENTITY_STATES = [...rubroRoute, ...rubroPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [RubroComponent, RubroDetailComponent, RubroUpdateComponent, RubroDeleteDialogComponent, RubroDeletePopupComponent],
    entryComponents: [RubroComponent, RubroUpdateComponent, RubroDeleteDialogComponent, RubroDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetRubroModule {}
