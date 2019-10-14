import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ListaPrecioDesdeHasta } from 'app/shared/model/lista-precio-desde-hasta.model';
import { ListaPrecioDesdeHastaService } from './lista-precio-desde-hasta.service';
import { ListaPrecioDesdeHastaComponent } from './lista-precio-desde-hasta.component';
import { ListaPrecioDesdeHastaDetailComponent } from './lista-precio-desde-hasta-detail.component';
import { ListaPrecioDesdeHastaUpdateComponent } from './lista-precio-desde-hasta-update.component';
import { ListaPrecioDesdeHastaDeletePopupComponent } from './lista-precio-desde-hasta-delete-dialog.component';
import { IListaPrecioDesdeHasta } from 'app/shared/model/lista-precio-desde-hasta.model';

@Injectable({ providedIn: 'root' })
export class ListaPrecioDesdeHastaResolve implements Resolve<IListaPrecioDesdeHasta> {
  constructor(private service: ListaPrecioDesdeHastaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IListaPrecioDesdeHasta> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ListaPrecioDesdeHasta>) => response.ok),
        map((listaPrecioDesdeHasta: HttpResponse<ListaPrecioDesdeHasta>) => listaPrecioDesdeHasta.body)
      );
    }
    return of(new ListaPrecioDesdeHasta());
  }
}

export const listaPrecioDesdeHastaRoute: Routes = [
  {
    path: '',
    component: ListaPrecioDesdeHastaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ListaPrecioDesdeHastas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ListaPrecioDesdeHastaDetailComponent,
    resolve: {
      listaPrecioDesdeHasta: ListaPrecioDesdeHastaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ListaPrecioDesdeHastas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ListaPrecioDesdeHastaUpdateComponent,
    resolve: {
      listaPrecioDesdeHasta: ListaPrecioDesdeHastaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ListaPrecioDesdeHastas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ListaPrecioDesdeHastaUpdateComponent,
    resolve: {
      listaPrecioDesdeHasta: ListaPrecioDesdeHastaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ListaPrecioDesdeHastas'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const listaPrecioDesdeHastaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ListaPrecioDesdeHastaDeletePopupComponent,
    resolve: {
      listaPrecioDesdeHasta: ListaPrecioDesdeHastaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ListaPrecioDesdeHastas'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
