import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    RubroComponent,
    RubroDetailComponent,
    RubroUpdateComponent,
    RubroDeleteDialogComponent,
    RubroDeletePopupComponent,
    rubroRoute,
    rubroPopupRoute
} from 'app/entities/rubro';

const ENTITY_STATES = [...rubroRoute, ...rubroPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [RubroComponent, RubroDeleteDialogComponent, RubroDeletePopupComponent, RubroDetailComponent, RubroUpdateComponent],
    entryComponents: [RubroComponent, RubroUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetRubroModule {}
