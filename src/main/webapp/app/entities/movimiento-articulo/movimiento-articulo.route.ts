import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MovimientoArticuloComponent } from './movimiento-articulo.component';
import { MovimientoArticuloDetailComponent } from './movimiento-articulo-detail.component';
import { MovimientoArticuloPopupComponent } from './movimiento-articulo-dialog.component';
import { MovimientoArticuloDeletePopupComponent } from './movimiento-articulo-delete-dialog.component';

export const movimientoArticuloRoute: Routes = [
    {
        path: 'movimiento-articulo',
        component: MovimientoArticuloComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovimientoArticulos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'movimiento-articulo/:id',
        component: MovimientoArticuloDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovimientoArticulos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const movimientoArticuloPopupRoute: Routes = [
    {
        path: 'movimiento-articulo-new',
        component: MovimientoArticuloPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovimientoArticulos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'movimiento-articulo/:id/edit',
        component: MovimientoArticuloPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovimientoArticulos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'movimiento-articulo/:id/delete',
        component: MovimientoArticuloDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovimientoArticulos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
