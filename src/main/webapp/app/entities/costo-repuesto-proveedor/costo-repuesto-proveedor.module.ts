import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { CostoRepuestoProveedorComponent } from './costo-repuesto-proveedor.component';
import { CostoRepuestoProveedorDetailComponent } from './costo-repuesto-proveedor-detail.component';
import { CostoRepuestoProveedorUpdateComponent } from './costo-repuesto-proveedor-update.component';
import {
  CostoRepuestoProveedorDeletePopupComponent,
  CostoRepuestoProveedorDeleteDialogComponent
} from './costo-repuesto-proveedor-delete-dialog.component';
import { costoRepuestoProveedorRoute, costoRepuestoProveedorPopupRoute } from './costo-repuesto-proveedor.route';

const ENTITY_STATES = [...costoRepuestoProveedorRoute, ...costoRepuestoProveedorPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CostoRepuestoProveedorComponent,
    CostoRepuestoProveedorDetailComponent,
    CostoRepuestoProveedorUpdateComponent,
    CostoRepuestoProveedorDeleteDialogComponent,
    CostoRepuestoProveedorDeletePopupComponent
  ],
  entryComponents: [
    CostoRepuestoProveedorComponent,
    CostoRepuestoProveedorUpdateComponent,
    CostoRepuestoProveedorDeleteDialogComponent,
    CostoRepuestoProveedorDeletePopupComponent
  ]
})
export class SoldimetCostoRepuestoProveedorModule {}
