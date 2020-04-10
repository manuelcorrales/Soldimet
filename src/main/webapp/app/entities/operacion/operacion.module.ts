import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { OperacionComponent } from 'app/entities/operacion/operacion.component';
import { OperacionDetailComponent } from 'app/entities/operacion/operacion-detail.component';
import { OperacionUpdateComponent } from 'app/entities/operacion/operacion-update.component';
import { OperacionDeletePopupComponent, OperacionDeleteDialogComponent } from 'app/entities/operacion/operacion-delete-dialog.component';
import { operacionRoute, operacionPopupRoute } from 'app/entities/operacion/operacion.route';

const ENTITY_STATES = [...operacionRoute, ...operacionPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    OperacionComponent,
    OperacionDetailComponent,
    OperacionUpdateComponent,
    OperacionDeleteDialogComponent,
    OperacionDeletePopupComponent
  ],
  entryComponents: [OperacionComponent, OperacionUpdateComponent, OperacionDeleteDialogComponent, OperacionDeletePopupComponent]
})
export class SoldimetOperacionModule {}
