import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared';
import {
    MotorComponent,
    MotorDetailComponent,
    MotorUpdateComponent,
    MotorDeleteDialogComponent,
    MotorDeletePopupComponent,
    motorRoute,
    motorPopupRoute
} from 'app/entities/motor';

const ENTITY_STATES = [...motorRoute, ...motorPopupRoute];

@NgModule({
    imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [MotorComponent, MotorDetailComponent, MotorDeletePopupComponent, MotorDeleteDialogComponent, MotorUpdateComponent],
    entryComponents: [MotorComponent, MotorUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoldimetMotorModule {}
