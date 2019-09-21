import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EstadoCobranzaOperacion } from 'app/shared/model/estado-cobranza-operacion.model';
import { EstadoCobranzaOperacionService } from './estado-cobranza-operacion.service';
import { EstadoCobranzaOperacionComponent } from './estado-cobranza-operacion.component';
import { EstadoCobranzaOperacionDetailComponent } from './estado-cobranza-operacion-detail.component';
import { EstadoCobranzaOperacionUpdateComponent } from './estado-cobranza-operacion-update.component';
import { EstadoCobranzaOperacionDeletePopupComponent } from './estado-cobranza-operacion-delete-dialog.component';
import { IEstadoCobranzaOperacion } from 'app/shared/model/estado-cobranza-operacion.model';

@Injectable({ providedIn: 'root' })
export class EstadoCobranzaOperacionResolve implements Resolve<IEstadoCobranzaOperacion> {
  constructor(private service: EstadoCobranzaOperacionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEstadoCobranzaOperacion> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<EstadoCobranzaOperacion>) => response.ok),
        map((estadoCobranzaOperacion: HttpResponse<EstadoCobranzaOperacion>) => estadoCobranzaOperacion.body)
      );
    }
    return of(new EstadoCobranzaOperacion());
  }
}

export const estadoCobranzaOperacionRoute: Routes = [
  {
    path: '',
    component: EstadoCobranzaOperacionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoCobranzaOperacions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EstadoCobranzaOperacionDetailComponent,
    resolve: {
      estadoCobranzaOperacion: EstadoCobranzaOperacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoCobranzaOperacions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EstadoCobranzaOperacionUpdateComponent,
    resolve: {
      estadoCobranzaOperacion: EstadoCobranzaOperacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoCobranzaOperacions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EstadoCobranzaOperacionUpdateComponent,
    resolve: {
      estadoCobranzaOperacion: EstadoCobranzaOperacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoCobranzaOperacions'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const estadoCobranzaOperacionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EstadoCobranzaOperacionDeletePopupComponent,
    resolve: {
      estadoCobranzaOperacion: EstadoCobranzaOperacionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EstadoCobranzaOperacions'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
