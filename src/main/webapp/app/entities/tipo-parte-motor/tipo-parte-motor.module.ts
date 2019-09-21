import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { TipoParteMotorComponent } from './tipo-parte-motor.component';
import { TipoParteMotorDetailComponent } from './tipo-parte-motor-detail.component';
import { TipoParteMotorUpdateComponent } from './tipo-parte-motor-update.component';
import { TipoParteMotorDeletePopupComponent, TipoParteMotorDeleteDialogComponent } from './tipo-parte-motor-delete-dialog.component';
import { tipoParteMotorRoute, tipoParteMotorPopupRoute } from './tipo-parte-motor.route';

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
