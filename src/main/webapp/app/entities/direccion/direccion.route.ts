import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DireccionComponent } from './direccion.component';
import { DireccionDetailComponent } from './direccion-detail.component';
import { DireccionPopupComponent } from './direccion-dialog.component';
import { DireccionDeletePopupComponent } from './direccion-delete-dialog.component';

export const direccionRoute: Routes = [
    {
        path: 'direccion',
        component: DireccionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Direccions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'direccion/:id',
        component: DireccionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Direccions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const direccionPopupRoute: Routes = [
    {
        path: 'direccion-new',
        component: DireccionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Direccions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'direccion/:id/edit',
        component: DireccionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Direccions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'direccion/:id/delete',
        component: DireccionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Direccions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
