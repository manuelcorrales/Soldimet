import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { ProveedorComponent } from 'app/entities/proveedor/proveedor.component';
import { ProveedorDetailComponent } from 'app/entities/proveedor/proveedor-detail.component';
import { ProveedorUpdateComponent } from 'app/entities/proveedor/proveedor-update.component';
import { ProveedorDeletePopupComponent, ProveedorDeleteDialogComponent } from 'app/entities/proveedor/proveedor-delete-dialog.component';
import { proveedorRoute, proveedorPopupRoute } from 'app/entities/proveedor/proveedor.route';

const ENTITY_STATES = [...proveedorRoute, ...proveedorPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProveedorComponent,
    ProveedorDetailComponent,
    ProveedorUpdateComponent,
    ProveedorDeleteDialogComponent,
    ProveedorDeletePopupComponent
  ],
  entryComponents: [ProveedorComponent, ProveedorUpdateComponent, ProveedorDeleteDialogComponent, ProveedorDeletePopupComponent]
})
export class SoldimetProveedorModule {}
