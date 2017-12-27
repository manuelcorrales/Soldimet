import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipoDetalleMovimientoComponent } from './tipo-detalle-movimiento.component';
import { TipoDetalleMovimientoDetailComponent } from './tipo-detalle-movimiento-detail.component';
import { TipoDetalleMovimientoPopupComponent } from './tipo-detalle-movimiento-dialog.component';
import { TipoDetalleMovimientoDeletePopupComponent } from './tipo-detalle-movimiento-delete-dialog.component';

export const tipoDetalleMovimientoRoute: Routes = [
    {
        path: 'tipo-detalle-movimiento',
        component: TipoDetalleMovimientoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoDetalleMovimientos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipo-detalle-movimiento/:id',
        component: TipoDetalleMovimientoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoDetalleMovimientos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoDetalleMovimientoPopupRoute: Routes = [
    {
        path: 'tipo-detalle-movimiento-new',
        component: TipoDetalleMovimientoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoDetalleMovimientos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-detalle-movimiento/:id/edit',
        component: TipoDetalleMovimientoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoDetalleMovimientos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-detalle-movimiento/:id/delete',
        component: TipoDetalleMovimientoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoDetalleMovimientos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
