import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CilindradaComponent } from './cilindrada.component';
import { CilindradaDetailComponent } from './cilindrada-detail.component';
import { CilindradaPopupComponent } from './cilindrada-dialog.component';
import { CilindradaDeletePopupComponent } from './cilindrada-delete-dialog.component';

export const cilindradaRoute: Routes = [
    {
        path: 'cilindrada',
        component: CilindradaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cilindradas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cilindrada/:id',
        component: CilindradaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cilindradas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cilindradaPopupRoute: Routes = [
    {
        path: 'cilindrada-new',
        component: CilindradaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cilindradas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cilindrada/:id/edit',
        component: CilindradaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cilindradas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cilindrada/:id/delete',
        component: CilindradaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Cilindradas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
