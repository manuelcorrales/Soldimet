import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CobranzaOperacionComponent } from './cobranza-operacion.component';
import { CobranzaOperacionDetailComponent } from './cobranza-operacion-detail.component';
import { CobranzaOperacionPopupComponent } from './cobranza-operacion-dialog.component';
import { CobranzaOperacionDeletePopupComponent } from './cobranza-operacion-delete-dialog.component';

export const cobranzaOperacionRoute: Routes = [
    {
        path: 'cobranza-operacion',
        component: CobranzaOperacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobranzaOperacions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cobranza-operacion/:id',
        component: CobranzaOperacionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobranzaOperacions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cobranzaOperacionPopupRoute: Routes = [
    {
        path: 'cobranza-operacion-new',
        component: CobranzaOperacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobranzaOperacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cobranza-operacion/:id/edit',
        component: CobranzaOperacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobranzaOperacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cobranza-operacion/:id/delete',
        component: CobranzaOperacionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobranzaOperacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
