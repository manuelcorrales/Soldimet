import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Sucursal } from 'app/shared/model/sucursal.model';
import { SucursalService } from 'app/entities/sucursal/sucursal.service';
import { SucursalComponent } from 'app/entities/sucursal/sucursal.component';
import { SucursalDetailComponent } from 'app/entities/sucursal/sucursal-detail.component';
import { SucursalUpdateComponent } from 'app/entities/sucursal/sucursal-update.component';
import { SucursalDeletePopupComponent } from 'app/entities/sucursal/sucursal-delete-dialog.component';
import { ISucursal } from 'app/shared/model/sucursal.model';

@Injectable({ providedIn: 'root' })
export class SucursalResolve implements Resolve<ISucursal> {
  constructor(private service: SucursalService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISucursal> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Sucursal>) => response.ok),
        map((sucursal: HttpResponse<Sucursal>) => sucursal.body)
      );
    }
    return of(new Sucursal());
  }
}

export const sucursalRoute: Routes = [
  {
    path: '',
    component: SucursalComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Sucursals'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SucursalDetailComponent,
    resolve: {
      sucursal: SucursalResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Sucursals'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SucursalUpdateComponent,
    resolve: {
      sucursal: SucursalResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Sucursals'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SucursalUpdateComponent,
    resolve: {
      sucursal: SucursalResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Sucursals'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const sucursalPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SucursalDeletePopupComponent,
    resolve: {
      sucursal: SucursalResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Sucursals'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
