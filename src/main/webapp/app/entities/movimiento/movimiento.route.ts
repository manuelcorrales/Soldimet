import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MovimientoComponent } from './movimiento.component';
import { MovimientoDetailComponent } from './movimiento-detail.component';
import { MovimientoPopupComponent } from './movimiento-dialog.component';
import { MovimientoDeletePopupComponent } from './movimiento-delete-dialog.component';

@Injectable()
export class MovimientoResolvePagingParams implements Resolve<any> {

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

export const movimientoRoute: Routes = [
    {
        path: 'movimiento',
        component: MovimientoComponent,
        resolve: {
            'pagingParams': MovimientoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Movimientos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'movimiento/:id',
        component: MovimientoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Movimientos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const movimientoPopupRoute: Routes = [
    {
        path: 'movimiento-new',
        component: MovimientoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Movimientos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'movimiento/:id/edit',
        component: MovimientoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Movimientos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'movimiento/:id/delete',
        component: MovimientoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Movimientos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
