import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CostoRepuestoProveedorComponent } from '../list/costo-repuesto-proveedor.component';
import { CostoRepuestoProveedorDetailComponent } from '../detail/costo-repuesto-proveedor-detail.component';
import { CostoRepuestoProveedorUpdateComponent } from '../update/costo-repuesto-proveedor-update.component';
import { CostoRepuestoProveedorRoutingResolveService } from './costo-repuesto-proveedor-routing-resolve.service';

const costoRepuestoProveedorRoute: Routes = [
  {
    path: '',
    component: CostoRepuestoProveedorComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CostoRepuestoProveedorDetailComponent,
    resolve: {
      costoRepuestoProveedor: CostoRepuestoProveedorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CostoRepuestoProveedorUpdateComponent,
    resolve: {
      costoRepuestoProveedor: CostoRepuestoProveedorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CostoRepuestoProveedorUpdateComponent,
    resolve: {
      costoRepuestoProveedor: CostoRepuestoProveedorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(costoRepuestoProveedorRoute)],
  exports: [RouterModule],
})
export class CostoRepuestoProveedorRoutingModule {}
