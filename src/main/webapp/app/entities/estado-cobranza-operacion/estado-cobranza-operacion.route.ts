import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { EstadoCobranzaOperacionComponent } from './estado-cobranza-operacion.component';
import { EstadoCobranzaOperacionDetailComponent } from './estado-cobranza-operacion-detail.component';
import { EstadoCobranzaOperacionPopupComponent } from './estado-cobranza-operacion-dialog.component';
import { EstadoCobranzaOperacionDeletePopupComponent } from './estado-cobranza-operacion-delete-dialog.component';

export const estadoCobranzaOperacionRoute: Routes = [
    {
        path: 'estado-cobranza-operacion',
        component: EstadoCobranzaOperacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoCobranzaOperacions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'estado-cobranza-operacion/:id',
        component: EstadoCobranzaOperacionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoCobranzaOperacions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const estadoCobranzaOperacionPopupRoute: Routes = [
    {
        path: 'estado-cobranza-operacion-new',
        component: EstadoCobranzaOperacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoCobranzaOperacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estado-cobranza-operacion/:id/edit',
        component: EstadoCobranzaOperacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoCobranzaOperacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estado-cobranza-operacion/:id/delete',
        component: EstadoCobranzaOperacionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoCobranzaOperacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
