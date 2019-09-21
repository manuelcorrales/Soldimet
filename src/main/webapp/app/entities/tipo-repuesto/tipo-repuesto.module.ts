import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { TipoRepuestoComponent } from './tipo-repuesto.component';
import { TipoRepuestoDetailComponent } from './tipo-repuesto-detail.component';
import { TipoRepuestoUpdateComponent } from './tipo-repuesto-update.component';
import { TipoRepuestoDeletePopupComponent, TipoRepuestoDeleteDialogComponent } from './tipo-repuesto-delete-dialog.component';
import { tipoRepuestoRoute, tipoRepuestoPopupRoute } from './tipo-repuesto.route';

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
