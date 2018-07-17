import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MovimientoPresupuestoComponent } from './movimiento-presupuesto.component';
import { MovimientoPresupuestoDetailComponent } from './movimiento-presupuesto-detail.component';
import { MovimientoPresupuestoPopupComponent } from './movimiento-presupuesto-dialog.component';
import { MovimientoPresupuestoDeletePopupComponent } from './movimiento-presupuesto-delete-dialog.component';

export const movimientoPresupuestoRoute: Routes = [
    {
        path: 'movimiento-presupuesto',
        component: MovimientoPresupuestoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovimientoPresupuestos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'movimiento-presupuesto/:id',
        component: MovimientoPresupuestoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovimientoPresupuestos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const movimientoPresupuestoPopupRoute: Routes = [
    {
        path: 'movimiento-presupuesto-new',
        component: MovimientoPresupuestoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovimientoPresupuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'movimiento-presupuesto/:id/edit',
        component: MovimientoPresupuestoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovimientoPresupuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'movimiento-presupuesto/:id/delete',
        component: MovimientoPresupuestoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovimientoPresupuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
