import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { BancoComponent } from './banco.component';
import { BancoDetailComponent } from './banco-detail.component';
import { BancoPopupComponent } from './banco-dialog.component';
import { BancoDeletePopupComponent } from './banco-delete-dialog.component';

export const bancoRoute: Routes = [
    {
        path: 'banco',
        component: BancoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bancos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'banco/:id',
        component: BancoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bancos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bancoPopupRoute: Routes = [
    {
        path: 'banco-new',
        component: BancoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bancos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'banco/:id/edit',
        component: BancoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bancos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'banco/:id/delete',
        component: BancoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Bancos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
