import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TipoParteMotorComponent } from './list/tipo-parte-motor.component';
import { TipoParteMotorDetailComponent } from './detail/tipo-parte-motor-detail.component';
import { TipoParteMotorUpdateComponent } from './update/tipo-parte-motor-update.component';
import { TipoParteMotorDeleteDialogComponent } from './delete/tipo-parte-motor-delete-dialog.component';
import { TipoParteMotorRoutingModule } from './route/tipo-parte-motor-routing.module';

@NgModule({
  imports: [SharedModule, TipoParteMotorRoutingModule],
  declarations: [
    TipoParteMotorComponent,
    TipoParteMotorDetailComponent,
    TipoParteMotorUpdateComponent,
    TipoParteMotorDeleteDialogComponent,
  ],
  entryComponents: [TipoParteMotorDeleteDialogComponent],
})
export class TipoParteMotorModule {}
