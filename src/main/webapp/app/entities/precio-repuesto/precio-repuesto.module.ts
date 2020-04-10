import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { PrecioRepuestoComponent } from 'app/entities/precio-repuesto/precio-repuesto.component';
import { PrecioRepuestoDetailComponent } from 'app/entities/precio-repuesto/precio-repuesto-detail.component';
import { PrecioRepuestoUpdateComponent } from 'app/entities/precio-repuesto/precio-repuesto-update.component';
import {
  PrecioRepuestoDeletePopupComponent,
  PrecioRepuestoDeleteDialogComponent
} from 'app/entities/precio-repuesto/precio-repuesto-delete-dialog.component';
import { precioRepuestoRoute, precioRepuestoPopupRoute } from 'app/entities/precio-repuesto/precio-repuesto.route';

const ENTITY_STATES = [...precioRepuestoRoute, ...precioRepuestoPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PrecioRepuestoComponent,
    PrecioRepuestoDetailComponent,
    PrecioRepuestoUpdateComponent,
    PrecioRepuestoDeleteDialogComponent,
    PrecioRepuestoDeletePopupComponent
  ],
  entryComponents: [
    PrecioRepuestoComponent,
    PrecioRepuestoUpdateComponent,
    PrecioRepuestoDeleteDialogComponent,
    PrecioRepuestoDeletePopupComponent
  ]
})
export class SoldimetPrecioRepuestoModule {}
