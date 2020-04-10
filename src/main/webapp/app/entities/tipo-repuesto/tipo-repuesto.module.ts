import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { TipoRepuestoComponent } from 'app/entities/tipo-repuesto/tipo-repuesto.component';
import { TipoRepuestoDetailComponent } from 'app/entities/tipo-repuesto/tipo-repuesto-detail.component';
import { TipoRepuestoUpdateComponent } from 'app/entities/tipo-repuesto/tipo-repuesto-update.component';
import {
  TipoRepuestoDeletePopupComponent,
  TipoRepuestoDeleteDialogComponent
} from 'app/entities/tipo-repuesto/tipo-repuesto-delete-dialog.component';
import { tipoRepuestoRoute, tipoRepuestoPopupRoute } from 'app/entities/tipo-repuesto/tipo-repuesto.route';

const ENTITY_STATES = [...tipoRepuestoRoute, ...tipoRepuestoPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TipoRepuestoComponent,
    TipoRepuestoDetailComponent,
    TipoRepuestoUpdateComponent,
    TipoRepuestoDeleteDialogComponent,
    TipoRepuestoDeletePopupComponent
  ],
  entryComponents: [TipoRepuestoComponent, TipoRepuestoUpdateComponent, TipoRepuestoDeleteDialogComponent, TipoRepuestoDeletePopupComponent]
})
export class SoldimetTipoRepuestoModule {}
