import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SubCategoria } from 'app/shared/model/sub-categoria.model';
import { SubCategoriaService } from './sub-categoria.service';
import { SubCategoriaComponent } from './sub-categoria.component';
import { SubCategoriaDetailComponent } from './sub-categoria-detail.component';
import { SubCategoriaUpdateComponent } from './sub-categoria-update.component';
import { SubCategoriaDeletePopupComponent } from './sub-categoria-delete-dialog.component';
import { ISubCategoria } from 'app/shared/model/sub-categoria.model';

@Injectable({ providedIn: 'root' })
export class SubCategoriaResolve implements Resolve<ISubCategoria> {
  constructor(private service: SubCategoriaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISubCategoria> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SubCategoria>) => response.ok),
        map((subCategoria: HttpResponse<SubCategoria>) => subCategoria.body)
      );
    }
    return of(new SubCategoria());
  }
}

export const subCategoriaRoute: Routes = [
  {
    path: '',
    component: SubCategoriaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SubCategorias'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SubCategoriaDetailComponent,
    resolve: {
      subCategoria: SubCategoriaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SubCategorias'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SubCategoriaUpdateComponent,
    resolve: {
      subCategoria: SubCategoriaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SubCategorias'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SubCategoriaUpdateComponent,
    resolve: {
      subCategoria: SubCategoriaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SubCategorias'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const subCategoriaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SubCategoriaDeletePopupComponent,
    resolve: {
      subCategoria: SubCategoriaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'SubCategorias'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
