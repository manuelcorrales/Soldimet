import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PrecioRepuestoComponent } from './precio-repuesto.component';
import { PrecioRepuestoDetailComponent } from './precio-repuesto-detail.component';
import { PrecioRepuestoPopupComponent } from './precio-repuesto-dialog.component';
import { PrecioRepuestoDeletePopupComponent } from './precio-repuesto-delete-dialog.component';

export const precioRepuestoRoute: Routes = [
    {
        path: 'precio-repuesto',
        component: PrecioRepuestoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PrecioRepuestos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'precio-repuesto/:id',
        component: PrecioRepuestoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PrecioRepuestos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const precioRepuestoPopupRoute: Routes = [
    {
        path: 'precio-repuesto-new',
        component: PrecioRepuestoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PrecioRepuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'precio-repuesto/:id/edit',
        component: PrecioRepuestoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PrecioRepuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'precio-repuesto/:id/delete',
        component: PrecioRepuestoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PrecioRepuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
