import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
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

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((articulo: HttpResponse<Articulo>) => articulo.body));
        }
        return of(new Articulo());
    }
}

export const articuloRoute: Routes = [
    {
        path: 'articulo',
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
        path: 'articulo/:id/view',
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
        path: 'articulo/new',
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
        path: 'articulo/:id/edit',
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
        path: 'articulo/:id/delete',
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
