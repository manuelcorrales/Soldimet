import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { MotorComponent } from 'app/entities/motor/motor.component';
import { MotorDetailComponent } from 'app/entities/motor/motor-detail.component';
import { MotorUpdateComponent } from 'app/entities/motor/motor-update.component';
import { MotorDeletePopupComponent, MotorDeleteDialogComponent } from 'app/entities/motor/motor-delete-dialog.component';
import { motorRoute, motorPopupRoute } from 'app/entities/motor/motor.route';

const ENTITY_STATES = [...motorRoute, ...motorPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [MotorComponent, MotorDetailComponent, MotorUpdateComponent, MotorDeleteDialogComponent, MotorDeletePopupComponent],
  entryComponents: [MotorComponent, MotorUpdateComponent, MotorDeleteDialogComponent, MotorDeletePopupComponent]
})
export class SoldimetMotorModule {}
