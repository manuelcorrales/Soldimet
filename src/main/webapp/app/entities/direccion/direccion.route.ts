import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Direccion } from 'app/shared/model/direccion.model';
import { DireccionService } from 'app/entities/direccion/direccion.service';
import { DireccionComponent } from 'app/entities/direccion/direccion.component';
import { DireccionDetailComponent } from 'app/entities/direccion/direccion-detail.component';
import { DireccionUpdateComponent } from 'app/entities/direccion/direccion-update.component';
import { DireccionDeletePopupComponent } from 'app/entities/direccion/direccion-delete-dialog.component';
import { IDireccion } from 'app/shared/model/direccion.model';

@Injectable({ providedIn: 'root' })
export class DireccionResolve implements Resolve<IDireccion> {
  constructor(private service: DireccionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDireccion> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Direccion>) => response.ok),
        map((direccion: HttpResponse<Direccion>) => direccion.body)
      );
    }
    return of(new Direccion());
  }
}

export const direccionRoute: Routes = [
  {
    path: '',
    component: DireccionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Direccions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DireccionDetailComponent,
    resolve: {
      direccion: DireccionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Direccions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DireccionUpdateComponent,
    resolve: {
      direccion: DireccionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Direccions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DireccionUpdateComponent,
    resolve: {
      direccion: DireccionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Direccions'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const direccionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DireccionDeletePopupComponent,
    resolve: {
      direccion: DireccionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Direccions'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
