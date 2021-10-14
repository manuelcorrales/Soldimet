import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CostoRepuestoProveedorComponent } from './list/costo-repuesto-proveedor.component';
import { CostoRepuestoProveedorDetailComponent } from './detail/costo-repuesto-proveedor-detail.component';
import { CostoRepuestoProveedorUpdateComponent } from './update/costo-repuesto-proveedor-update.component';
import { CostoRepuestoProveedorDeleteDialogComponent } from './delete/costo-repuesto-proveedor-delete-dialog.component';
import { CostoRepuestoProveedorRoutingModule } from './route/costo-repuesto-proveedor-routing.module';

@NgModule({
  imports: [SharedModule, CostoRepuestoProveedorRoutingModule],
  declarations: [
    CostoRepuestoProveedorComponent,
    CostoRepuestoProveedorDetailComponent,
    CostoRepuestoProveedorUpdateComponent,
    CostoRepuestoProveedorDeleteDialogComponent,
  ],
  entryComponents: [CostoRepuestoProveedorDeleteDialogComponent],
})
export class CostoRepuestoProveedorModule {}
