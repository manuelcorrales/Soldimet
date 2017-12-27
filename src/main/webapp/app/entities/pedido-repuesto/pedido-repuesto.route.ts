import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PedidoRepuestoComponent } from './pedido-repuesto.component';
import { PedidoRepuestoDetailComponent } from './pedido-repuesto-detail.component';
import { PedidoRepuestoPopupComponent } from './pedido-repuesto-dialog.component';
import { PedidoRepuestoDeletePopupComponent } from './pedido-repuesto-delete-dialog.component';

@Injectable()
export class PedidoRepuestoResolvePagingParams implements Resolve<any> {

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

export const pedidoRepuestoRoute: Routes = [
    {
        path: 'pedido-repuesto',
        component: PedidoRepuestoComponent,
        resolve: {
            'pagingParams': PedidoRepuestoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PedidoRepuestos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pedido-repuesto/:id',
        component: PedidoRepuestoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PedidoRepuestos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pedidoRepuestoPopupRoute: Routes = [
    {
        path: 'pedido-repuesto-new',
        component: PedidoRepuestoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PedidoRepuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pedido-repuesto/:id/edit',
        component: PedidoRepuestoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PedidoRepuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pedido-repuesto/:id/delete',
        component: PedidoRepuestoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PedidoRepuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
