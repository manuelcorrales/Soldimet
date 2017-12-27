import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CostoOperacionComponent } from './costo-operacion.component';
import { CostoOperacionDetailComponent } from './costo-operacion-detail.component';
import { CostoOperacionPopupComponent } from './costo-operacion-dialog.component';
import { CostoOperacionDeletePopupComponent } from './costo-operacion-delete-dialog.component';

export const costoOperacionRoute: Routes = [
    {
        path: 'costo-operacion',
        component: CostoOperacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostoOperacions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'costo-operacion/:id',
        component: CostoOperacionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostoOperacions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const costoOperacionPopupRoute: Routes = [
    {
        path: 'costo-operacion-new',
        component: CostoOperacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostoOperacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'costo-operacion/:id/edit',
        component: CostoOperacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostoOperacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'costo-operacion/:id/delete',
        component: CostoOperacionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostoOperacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
