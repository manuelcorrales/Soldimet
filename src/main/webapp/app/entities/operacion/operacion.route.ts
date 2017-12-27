import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { OperacionComponent } from './operacion.component';
import { OperacionDetailComponent } from './operacion-detail.component';
import { OperacionPopupComponent } from './operacion-dialog.component';
import { OperacionDeletePopupComponent } from './operacion-delete-dialog.component';

export const operacionRoute: Routes = [
    {
        path: 'operacion',
        component: OperacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Operacions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'operacion/:id',
        component: OperacionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Operacions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const operacionPopupRoute: Routes = [
    {
        path: 'operacion-new',
        component: OperacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Operacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'operacion/:id/edit',
        component: OperacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Operacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'operacion/:id/delete',
        component: OperacionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Operacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
