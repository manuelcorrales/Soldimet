import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    MotorComponent,
    MotorDetailComponent,
    MotorUpdateComponent,
    MotorDeletePopupComponent,
    MotorDeleteDialogComponent,
    motorRoute,
    motorPopupRoute
} from './';

const ENTITY_STATES = [...motorRoute, ...motorPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [MotorComponent, MotorDetailComponent, MotorUpdateComponent, MotorDeleteDialogComponent, MotorDeletePopupComponent],
    entryComponents: [MotorComponent, MotorUpdateComponent, MotorDeleteDialogComponent, MotorDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetMotorModule {}
