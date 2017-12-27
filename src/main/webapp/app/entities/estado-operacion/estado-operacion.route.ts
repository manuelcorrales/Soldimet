import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { EstadoOperacionComponent } from './estado-operacion.component';
import { EstadoOperacionDetailComponent } from './estado-operacion-detail.component';
import { EstadoOperacionPopupComponent } from './estado-operacion-dialog.component';
import { EstadoOperacionDeletePopupComponent } from './estado-operacion-delete-dialog.component';

export const estadoOperacionRoute: Routes = [
    {
        path: 'estado-operacion',
        component: EstadoOperacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoOperacions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'estado-operacion/:id',
        component: EstadoOperacionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoOperacions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const estadoOperacionPopupRoute: Routes = [
    {
        path: 'estado-operacion-new',
        component: EstadoOperacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoOperacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estado-operacion/:id/edit',
        component: EstadoOperacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoOperacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estado-operacion/:id/delete',
        component: EstadoOperacionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoOperacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
