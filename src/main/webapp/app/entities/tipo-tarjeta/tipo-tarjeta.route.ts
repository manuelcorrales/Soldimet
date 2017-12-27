import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipoTarjetaComponent } from './tipo-tarjeta.component';
import { TipoTarjetaDetailComponent } from './tipo-tarjeta-detail.component';
import { TipoTarjetaPopupComponent } from './tipo-tarjeta-dialog.component';
import { TipoTarjetaDeletePopupComponent } from './tipo-tarjeta-delete-dialog.component';

export const tipoTarjetaRoute: Routes = [
    {
        path: 'tipo-tarjeta',
        component: TipoTarjetaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoTarjetas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipo-tarjeta/:id',
        component: TipoTarjetaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoTarjetas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoTarjetaPopupRoute: Routes = [
    {
        path: 'tipo-tarjeta-new',
        component: TipoTarjetaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoTarjetas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-tarjeta/:id/edit',
        component: TipoTarjetaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoTarjetas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-tarjeta/:id/delete',
        component: TipoTarjetaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoTarjetas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
