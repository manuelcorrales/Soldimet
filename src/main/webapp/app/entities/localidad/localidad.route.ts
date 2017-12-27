import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { LocalidadComponent } from './localidad.component';
import { LocalidadDetailComponent } from './localidad-detail.component';
import { LocalidadPopupComponent } from './localidad-dialog.component';
import { LocalidadDeletePopupComponent } from './localidad-delete-dialog.component';

export const localidadRoute: Routes = [
    {
        path: 'localidad',
        component: LocalidadComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Localidads'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'localidad/:id',
        component: LocalidadDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Localidads'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const localidadPopupRoute: Routes = [
    {
        path: 'localidad-new',
        component: LocalidadPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Localidads'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'localidad/:id/edit',
        component: LocalidadPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Localidads'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'localidad/:id/delete',
        component: LocalidadDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Localidads'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
