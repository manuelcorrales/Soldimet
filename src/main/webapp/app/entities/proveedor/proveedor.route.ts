import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Proveedor } from 'app/shared/model/proveedor.model';
import { ProveedorService } from 'app/entities/proveedor/proveedor.service';
import { ProveedorComponent } from 'app/entities/proveedor/proveedor.component';
import { ProveedorDetailComponent } from 'app/entities/proveedor/proveedor-detail.component';
import { ProveedorUpdateComponent } from 'app/entities/proveedor/proveedor-update.component';
import { ProveedorDeletePopupComponent } from 'app/entities/proveedor/proveedor-delete-dialog.component';
import { IProveedor } from 'app/shared/model/proveedor.model';

@Injectable({ providedIn: 'root' })
export class ProveedorResolve implements Resolve<IProveedor> {
  constructor(private service: ProveedorService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProveedor> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Proveedor>) => response.ok),
        map((proveedor: HttpResponse<Proveedor>) => proveedor.body)
      );
    }
    return of(new Proveedor());
  }
}

export const proveedorRoute: Routes = [
  {
    path: '',
    component: ProveedorComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Proveedors'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProveedorDetailComponent,
    resolve: {
      proveedor: ProveedorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Proveedors'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProveedorUpdateComponent,
    resolve: {
      proveedor: ProveedorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Proveedors'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProveedorUpdateComponent,
    resolve: {
      proveedor: ProveedorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Proveedors'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const proveedorPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ProveedorDeletePopupComponent,
    resolve: {
      proveedor: ProveedorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Proveedors'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
