import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RubroComponent } from './rubro.component';
import { RubroDetailComponent } from './rubro-detail.component';
import { RubroPopupComponent } from './rubro-dialog.component';
import { RubroDeletePopupComponent } from './rubro-delete-dialog.component';

export const rubroRoute: Routes = [
    {
        path: 'rubro',
        component: RubroComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rubros'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'rubro/:id',
        component: RubroDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rubros'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rubroPopupRoute: Routes = [
    {
        path: 'rubro-new',
        component: RubroPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rubros'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rubro/:id/edit',
        component: RubroPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rubros'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rubro/:id/delete',
        component: RubroDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rubros'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
