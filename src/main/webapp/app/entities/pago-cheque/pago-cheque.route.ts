import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PagoChequeComponent } from './pago-cheque.component';
import { PagoChequeDetailComponent } from './pago-cheque-detail.component';
import { PagoChequePopupComponent } from './pago-cheque-dialog.component';
import { PagoChequeDeletePopupComponent } from './pago-cheque-delete-dialog.component';

export const pagoChequeRoute: Routes = [
    {
        path: 'pago-cheque',
        component: PagoChequeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PagoCheques'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pago-cheque/:id',
        component: PagoChequeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PagoCheques'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pagoChequePopupRoute: Routes = [
    {
        path: 'pago-cheque-new',
        component: PagoChequePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PagoCheques'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pago-cheque/:id/edit',
        component: PagoChequePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PagoCheques'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pago-cheque/:id/delete',
        component: PagoChequeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PagoCheques'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
