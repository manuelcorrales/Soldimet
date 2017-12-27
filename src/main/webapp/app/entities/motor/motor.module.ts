import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from '../../shared';
import {
    MotorService,
    MotorPopupService,
    MotorComponent,
    MotorDetailComponent,
    MotorDialogComponent,
    MotorPopupComponent,
    MotorDeletePopupComponent,
    MotorDeleteDialogComponent,
    motorRoute,
    motorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...motorRoute,
    ...motorPopupRoute,
];

@NgModule({
    imports: [
        SoldimetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MotorComponent,
        MotorDetailComponent,
        MotorDialogComponent,
        MotorDeleteDialogComponent,
        MotorPopupComponent,
        MotorDeletePopupComponent,
    ],
    entryComponents: [
        MotorComponent,
        MotorDialogComponent,
        MotorPopupComponent,
        MotorDeleteDialogComponent,
        MotorDeletePopupComponent,
    ],
    providers: [
        MotorService,
        MotorPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetMotorModule {}
