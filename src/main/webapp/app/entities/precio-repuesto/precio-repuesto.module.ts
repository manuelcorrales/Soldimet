import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { PrecioRepuestoComponent } from './precio-repuesto.component';
import { PrecioRepuestoDetailComponent } from './precio-repuesto-detail.component';
import { PrecioRepuestoUpdateComponent } from './precio-repuesto-update.component';
import { PrecioRepuestoDeletePopupComponent, PrecioRepuestoDeleteDialogComponent } from './precio-repuesto-delete-dialog.component';
import { precioRepuestoRoute, precioRepuestoPopupRoute } from './precio-repuesto.route';

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
