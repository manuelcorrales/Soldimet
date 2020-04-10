import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { TipoParteMotorComponent } from 'app/entities/tipo-parte-motor/tipo-parte-motor.component';
import { TipoParteMotorDetailComponent } from 'app/entities/tipo-parte-motor/tipo-parte-motor-detail.component';
import { TipoParteMotorUpdateComponent } from 'app/entities/tipo-parte-motor/tipo-parte-motor-update.component';
import {
  TipoParteMotorDeletePopupComponent,
  TipoParteMotorDeleteDialogComponent
} from 'app/entities/tipo-parte-motor/tipo-parte-motor-delete-dialog.component';
import { tipoParteMotorRoute, tipoParteMotorPopupRoute } from 'app/entities/tipo-parte-motor/tipo-parte-motor.route';

const ENTITY_STATES = [...tipoParteMotorRoute, ...tipoParteMotorPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TipoParteMotorComponent,
    TipoParteMotorDetailComponent,
    TipoParteMotorUpdateComponent,
    TipoParteMotorDeleteDialogComponent,
    TipoParteMotorDeletePopupComponent
  ],
  entryComponents: [
    TipoParteMotorComponent,
    TipoParteMotorUpdateComponent,
    TipoParteMotorDeleteDialogComponent,
    TipoParteMotorDeletePopupComponent
  ]
})
export class SoldimetTipoParteMotorModule {}
