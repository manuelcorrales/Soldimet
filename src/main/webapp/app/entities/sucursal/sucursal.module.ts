import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { SucursalComponent } from 'app/entities/sucursal/sucursal.component';
import { SucursalDetailComponent } from 'app/entities/sucursal/sucursal-detail.component';
import { SucursalUpdateComponent } from 'app/entities/sucursal/sucursal-update.component';
import { SucursalDeletePopupComponent, SucursalDeleteDialogComponent } from 'app/entities/sucursal/sucursal-delete-dialog.component';
import { sucursalRoute, sucursalPopupRoute } from 'app/entities/sucursal/sucursal.route';

const ENTITY_STATES = [...sucursalRoute, ...sucursalPopupRoute];

@NgModule({
  imports: [SoldimetSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SucursalComponent,
    SucursalDetailComponent,
    SucursalUpdateComponent,
    SucursalDeleteDialogComponent,
    SucursalDeletePopupComponent
  ],
  entryComponents: [SucursalComponent, SucursalUpdateComponent, SucursalDeleteDialogComponent, SucursalDeletePopupComponent]
})
export class SoldimetSucursalModule {}
