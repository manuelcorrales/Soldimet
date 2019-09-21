import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Rubro } from 'app/shared/model/rubro.model';
import { RubroService } from './rubro.service';
import { RubroComponent } from './rubro.component';
import { RubroDetailComponent } from './rubro-detail.component';
import { RubroUpdateComponent } from './rubro-update.component';
import { RubroDeletePopupComponent } from './rubro-delete-dialog.component';
import { IRubro } from 'app/shared/model/rubro.model';

@Injectable({ providedIn: 'root' })
export class RubroResolve implements Resolve<IRubro> {
  constructor(private service: RubroService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRubro> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Rubro>) => response.ok),
        map((rubro: HttpResponse<Rubro>) => rubro.body)
      );
    }
    return of(new Rubro());
  }
}

export const rubroRoute: Routes = [
  {
    path: '',
    component: RubroComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Rubros'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RubroDetailComponent,
    resolve: {
      rubro: RubroResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Rubros'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RubroUpdateComponent,
    resolve: {
      rubro: RubroResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Rubros'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RubroUpdateComponent,
    resolve: {
      rubro: RubroResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Rubros'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const rubroPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: RubroDeletePopupComponent,
    resolve: {
      rubro: RubroResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Rubros'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
