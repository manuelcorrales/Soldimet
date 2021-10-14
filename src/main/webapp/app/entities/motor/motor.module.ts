import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { MotorComponent } from './list/motor.component';
import { MotorDetailComponent } from './detail/motor-detail.component';
import { MotorUpdateComponent } from './update/motor-update.component';
import { MotorDeleteDialogComponent } from './delete/motor-delete-dialog.component';
import { MotorRoutingModule } from './route/motor-routing.module';

@NgModule({
  imports: [SharedModule, MotorRoutingModule],
  declarations: [MotorComponent, MotorDetailComponent, MotorUpdateComponent, MotorDeleteDialogComponent],
  entryComponents: [MotorDeleteDialogComponent],
})
export class MotorModule {}
