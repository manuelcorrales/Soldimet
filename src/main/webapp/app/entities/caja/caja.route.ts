import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CajaComponent } from './caja.component';
import { CajaDetailComponent } from './caja-detail.component';
import { CajaPopupComponent } from './caja-dialog.component';
import { CajaDeletePopupComponent } from './caja-delete-dialog.component';

@Injectable()
export class CajaResolvePagingParams implements Resolve<any> {

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

export const cajaRoute: Routes = [
    {
        path: 'caja',
        component: CajaComponent,
        resolve: {
            'pagingParams': CajaResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cajas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'caja/:id',
        component: CajaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cajas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cajaPopupRoute: Routes = [
    {
        path: 'caja-new',
        component: CajaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cajas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'caja/:id/edit',
        component: CajaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cajas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'caja/:id/delete',
        component: CajaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cajas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
