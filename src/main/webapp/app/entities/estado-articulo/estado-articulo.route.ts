import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { EstadoArticuloComponent } from './estado-articulo.component';
import { EstadoArticuloDetailComponent } from './estado-articulo-detail.component';
import { EstadoArticuloPopupComponent } from './estado-articulo-dialog.component';
import { EstadoArticuloDeletePopupComponent } from './estado-articulo-delete-dialog.component';

export const estadoArticuloRoute: Routes = [
    {
        path: 'estado-articulo',
        component: EstadoArticuloComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoArticulos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'estado-articulo/:id',
        component: EstadoArticuloDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoArticulos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const estadoArticuloPopupRoute: Routes = [
    {
        path: 'estado-articulo-new',
        component: EstadoArticuloPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoArticulos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estado-articulo/:id/edit',
        component: EstadoArticuloPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoArticulos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estado-articulo/:id/delete',
        component: EstadoArticuloDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoArticulos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
