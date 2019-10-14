import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoldimetSharedModule } from 'app/shared/shared.module';
import { SucursalComponent } from './sucursal.component';
import { SucursalDetailComponent } from './sucursal-detail.component';
import { SucursalUpdateComponent } from './sucursal-update.component';
import { SucursalDeletePopupComponent, SucursalDeleteDialogComponent } from './sucursal-delete-dialog.component';
import { sucursalRoute, sucursalPopupRoute } from './sucursal.route';

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
