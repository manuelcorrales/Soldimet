import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { AplicacionComponent } from './aplicacion.component';
import { AplicacionDetailComponent } from './aplicacion-detail.component';
import { AplicacionUpdateComponent } from './aplicacion-update.component';
import { AplicacionDeletePopupComponent, AplicacionDeleteDialogComponent } from './aplicacion-delete-dialog.component';
import { aplicacionRoute, aplicacionPopupRoute } from './aplicacion.route';

const ENTITY_STATES = [...aplicacionRoute, ...aplicacionPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AplicacionComponent,
    AplicacionDetailComponent,
    AplicacionUpdateComponent,
    AplicacionDeleteDialogComponent,
    AplicacionDeletePopupComponent
  ],
  entryComponents: [AplicacionComponent, AplicacionUpdateComponent, AplicacionDeleteDialogComponent, AplicacionDeletePopupComponent]
})
export class SoldimetAplicacionModule {}
