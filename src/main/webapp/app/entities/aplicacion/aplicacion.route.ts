import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Aplicacion } from 'app/shared/model/aplicacion.model';
import { AplicacionService } from './aplicacion.service';
import { AplicacionComponent } from './aplicacion.component';
import { AplicacionDetailComponent } from './aplicacion-detail.component';
import { AplicacionUpdateComponent } from './aplicacion-update.component';
import { AplicacionDeletePopupComponent } from './aplicacion-delete-dialog.component';
import { IAplicacion } from 'app/shared/model/aplicacion.model';

@Injectable({ providedIn: 'root' })
export class AplicacionResolve implements Resolve<IAplicacion> {
  constructor(private service: AplicacionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAplicacion> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Aplicacion>) => response.ok),
        map((aplicacion: HttpResponse<Aplicacion>) => aplicacion.body)
      );
    }
    return of(new Aplicacion());
  }
}

export const aplicacionRoute: Routes = [
  {
    path: '',
    component: AplicacionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Aplicacions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AplicacionDetailComponent,
    resolve: {
      aplicacion: AplicacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Aplicacions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AplicacionUpdateComponent,
    resolve: {
      aplicacion: AplicacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Aplicacions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AplicacionUpdateComponent,
    resolve: {
      aplicacion: AplicacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Aplicacions'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const aplicacionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: AplicacionDeletePopupComponent,
    resolve: {
      aplicacion: AplicacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Aplicacions'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
