import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PresupuestoComponent } from './presupuesto.component';
import { PresupuestoDetailComponent } from './presupuesto-detail.component';
import { PresupuestoPopupComponent } from './presupuesto-dialog.component';
import { PresupuestoDeletePopupComponent } from './presupuesto-delete-dialog.component';

@Injectable()
export class PresupuestoResolvePagingParams implements Resolve<any> {

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

export const presupuestoRoute: Routes = [
    {
        path: 'presupuesto',
        component: PresupuestoComponent,
        resolve: {
            'pagingParams': PresupuestoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Presupuestos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'presupuesto/:id',
        component: PresupuestoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Presupuestos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const presupuestoPopupRoute: Routes = [
    {
        path: 'presupuesto-new',
        component: PresupuestoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Presupuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'presupuesto/:id/edit',
        component: PresupuestoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Presupuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'presupuesto/:id/delete',
        component: PresupuestoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Presupuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
