import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { OperacionComponent } from './operacion.component';
import { OperacionDetailComponent } from './operacion-detail.component';
import { OperacionUpdateComponent } from './operacion-update.component';
import { OperacionDeletePopupComponent, OperacionDeleteDialogComponent } from './operacion-delete-dialog.component';
import { operacionRoute, operacionPopupRoute } from './operacion.route';
import { OperacionAddListasComponent } from './operacion-add-listas.component';

const ENTITY_STATES = [...operacionRoute, ...operacionPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    OperacionComponent,
    OperacionDetailComponent,
    OperacionUpdateComponent,
    OperacionDeleteDialogComponent,
    OperacionDeletePopupComponent,
    OperacionAddListasComponent
  ],
  entryComponents: [OperacionComponent, OperacionUpdateComponent, OperacionDeleteDialogComponent, OperacionDeletePopupComponent]
})
export class SoldimetOperacionModule {}
