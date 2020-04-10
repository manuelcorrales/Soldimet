import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Articulo } from 'app/shared/model/articulo.model';
import { ArticuloService } from 'app/entities/articulo/articulo.service';
import { ArticuloComponent } from 'app/entities/articulo/articulo.component';
import { ArticuloDetailComponent } from 'app/entities/articulo/articulo-detail.component';
import { ArticuloUpdateComponent } from 'app/entities/articulo/articulo-update.component';
import { ArticuloDeletePopupComponent } from 'app/entities/articulo/articulo-delete-dialog.component';
import { IArticulo } from 'app/shared/model/articulo.model';

@Injectable({ providedIn: 'root' })
export class ArticuloResolve implements Resolve<IArticulo> {
  constructor(private service: ArticuloService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IArticulo> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Articulo>) => response.ok),
        map((articulo: HttpResponse<Articulo>) => articulo.body)
      );
    }
    return of(new Articulo());
  }
}

export const articuloRoute: Routes = [
  {
    path: '',
    component: ArticuloComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Articulos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ArticuloDetailComponent,
    resolve: {
      articulo: ArticuloResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Articulos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ArticuloUpdateComponent,
    resolve: {
      articulo: ArticuloResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Articulos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ArticuloUpdateComponent,
    resolve: {
      articulo: ArticuloResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Articulos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const articuloPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ArticuloDeletePopupComponent,
    resolve: {
      articulo: ArticuloResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Articulos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
