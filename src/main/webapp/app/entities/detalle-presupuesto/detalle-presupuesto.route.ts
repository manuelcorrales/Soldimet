import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DetallePresupuestoComponent } from './detalle-presupuesto.component';
import { DetallePresupuestoDetailComponent } from './detalle-presupuesto-detail.component';
import { DetallePresupuestoPopupComponent } from './detalle-presupuesto-dialog.component';
import { DetallePresupuestoDeletePopupComponent } from './detalle-presupuesto-delete-dialog.component';

export const detallePresupuestoRoute: Routes = [
    {
        path: 'detalle-presupuesto',
        component: DetallePresupuestoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DetallePresupuestos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'detalle-presupuesto/:id',
        component: DetallePresupuestoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DetallePresupuestos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const detallePresupuestoPopupRoute: Routes = [
    {
        path: 'detalle-presupuesto-new',
        component: DetallePresupuestoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DetallePresupuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'detalle-presupuesto/:id/edit',
        component: DetallePresupuestoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DetallePresupuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'detalle-presupuesto/:id/delete',
        component: DetallePresupuestoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DetallePresupuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
