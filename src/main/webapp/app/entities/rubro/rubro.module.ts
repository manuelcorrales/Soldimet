import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    RubroService,
    RubroPopupService,
    RubroComponent,
    RubroDetailComponent,
    RubroDialogComponent,
    RubroPopupComponent,
    RubroDeletePopupComponent,
    RubroDeleteDialogComponent,
    rubroRoute,
    rubroPopupRoute,
} from './';

const ENTITY_STATES = [
    ...rubroRoute,
    ...rubroPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RubroComponent,
        RubroDetailComponent,
        RubroDialogComponent,
        RubroDeleteDialogComponent,
        RubroPopupComponent,
        RubroDeletePopupComponent,
    ],
    entryComponents: [
        RubroComponent,
        RubroDialogComponent,
        RubroPopupComponent,
        RubroDeleteDialogComponent,
        RubroDeletePopupComponent,
    ],
    providers: [
        RubroService,
        RubroPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetRubroModule {}
