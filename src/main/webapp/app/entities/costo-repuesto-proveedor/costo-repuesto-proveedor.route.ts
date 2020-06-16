import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CostoRepuestoProveedor } from 'app/shared/model/costo-repuesto-proveedor.model';
import { CostoRepuestoProveedorService } from './costo-repuesto-proveedor.service';
import { CostoRepuestoProveedorComponent } from './costo-repuesto-proveedor.component';
import { CostoRepuestoProveedorDetailComponent } from './costo-repuesto-proveedor-detail.component';
import { CostoRepuestoProveedorUpdateComponent } from './costo-repuesto-proveedor-update.component';
import { CostoRepuestoProveedorDeletePopupComponent } from './costo-repuesto-proveedor-delete-dialog.component';
import { ICostoRepuestoProveedor } from 'app/shared/model/costo-repuesto-proveedor.model';

@Injectable({ providedIn: 'root' })
export class CostoRepuestoProveedorResolve implements Resolve<ICostoRepuestoProveedor> {
  constructor(private service: CostoRepuestoProveedorService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICostoRepuestoProveedor> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CostoRepuestoProveedor>) => response.ok),
        map((costoRepuestoProveedor: HttpResponse<CostoRepuestoProveedor>) => costoRepuestoProveedor.body)
      );
    }
    return of(new CostoRepuestoProveedor());
  }
}

export const costoRepuestoProveedorRoute: Routes = [
  {
    path: '',
    component: CostoRepuestoProveedorComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CostoRepuestoProveedors'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CostoRepuestoProveedorDetailComponent,
    resolve: {
      costoRepuestoProveedor: CostoRepuestoProveedorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CostoRepuestoProveedors'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CostoRepuestoProveedorUpdateComponent,
    resolve: {
      costoRepuestoProveedor: CostoRepuestoProveedorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CostoRepuestoProveedors'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CostoRepuestoProveedorUpdateComponent,
    resolve: {
      costoRepuestoProveedor: CostoRepuestoProveedorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CostoRepuestoProveedors'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const costoRepuestoProveedorPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CostoRepuestoProveedorDeletePopupComponent,
    resolve: {
      costoRepuestoProveedor: CostoRepuestoProveedorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CostoRepuestoProveedors'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
