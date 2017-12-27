import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { EstadoPresupuestoComponent } from './estado-presupuesto.component';
import { EstadoPresupuestoDetailComponent } from './estado-presupuesto-detail.component';
import { EstadoPresupuestoPopupComponent } from './estado-presupuesto-dialog.component';
import { EstadoPresupuestoDeletePopupComponent } from './estado-presupuesto-delete-dialog.component';

export const estadoPresupuestoRoute: Routes = [
    {
        path: 'estado-presupuesto',
        component: EstadoPresupuestoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPresupuestos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'estado-presupuesto/:id',
        component: EstadoPresupuestoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPresupuestos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const estadoPresupuestoPopupRoute: Routes = [
    {
        path: 'estado-presupuesto-new',
        component: EstadoPresupuestoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPresupuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estado-presupuesto/:id/edit',
        component: EstadoPresupuestoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPresupuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estado-presupuesto/:id/delete',
        component: EstadoPresupuestoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPresupuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
