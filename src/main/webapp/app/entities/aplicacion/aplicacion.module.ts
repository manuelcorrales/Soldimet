import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { AplicacionComponent } from 'app/entities/aplicacion/aplicacion.component';
import { AplicacionDetailComponent } from 'app/entities/aplicacion/aplicacion-detail.component';
import { AplicacionUpdateComponent } from 'app/entities/aplicacion/aplicacion-update.component';
import {
  AplicacionDeletePopupComponent,
  AplicacionDeleteDialogComponent
} from 'app/entities/aplicacion/aplicacion-delete-dialog.component';
import { aplicacionRoute, aplicacionPopupRoute } from 'app/entities/aplicacion/aplicacion.route';

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
