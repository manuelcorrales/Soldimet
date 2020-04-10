import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EstadoOperacion } from 'app/shared/model/estado-operacion.model';
import { EstadoOperacionService } from 'app/entities/estado-operacion/estado-operacion.service';
import { EstadoOperacionComponent } from 'app/entities/estado-operacion/estado-operacion.component';
import { EstadoOperacionDetailComponent } from 'app/entities/estado-operacion/estado-operacion-detail.component';
import { EstadoOperacionUpdateComponent } from 'app/entities/estado-operacion/estado-operacion-update.component';
import { EstadoOperacionDeletePopupComponent } from 'app/entities/estado-operacion/estado-operacion-delete-dialog.component';
import { IEstadoOperacion } from 'app/shared/model/estado-operacion.model';

@Injectable({ providedIn: 'root' })
export class EstadoOperacionResolve implements Resolve<IEstadoOperacion> {
  constructor(private service: EstadoOperacionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEstadoOperacion> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<EstadoOperacion>) => response.ok),
        map((estadoOperacion: HttpResponse<EstadoOperacion>) => estadoOperacion.body)
      );
    }
    return of(new EstadoOperacion());
  }
}

export const estadoOperacionRoute: Routes = [
  {
    path: '',
    component: EstadoOperacionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoOperacions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EstadoOperacionDetailComponent,
    resolve: {
      estadoOperacion: EstadoOperacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoOperacions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EstadoOperacionUpdateComponent,
    resolve: {
      estadoOperacion: EstadoOperacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoOperacions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EstadoOperacionUpdateComponent,
    resolve: {
      estadoOperacion: EstadoOperacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoOperacions'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const estadoOperacionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EstadoOperacionDeletePopupComponent,
    resolve: {
      estadoOperacion: EstadoOperacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoOperacions'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
