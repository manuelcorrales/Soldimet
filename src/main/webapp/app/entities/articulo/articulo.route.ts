import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ArticuloComponent } from './articulo.component';
import { ArticuloDetailComponent } from './articulo-detail.component';
import { ArticuloPopupComponent } from './articulo-dialog.component';
import { ArticuloDeletePopupComponent } from './articulo-delete-dialog.component';

@Injectable()
export class ArticuloResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const articuloRoute: Routes = [
    {
        path: 'articulo',
        component: ArticuloComponent,
        resolve: {
            'pagingParams': ArticuloResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Articulos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'articulo/:id',
        component: ArticuloDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Articulos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const articuloPopupRoute: Routes = [
    {
        path: 'articulo-new',
        component: ArticuloPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Articulos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'articulo/:id/edit',
        component: ArticuloPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Articulos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'articulo/:id/delete',
        component: ArticuloDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Articulos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
