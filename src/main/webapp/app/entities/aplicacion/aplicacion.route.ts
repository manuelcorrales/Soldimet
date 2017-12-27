import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AplicacionComponent } from './aplicacion.component';
import { AplicacionDetailComponent } from './aplicacion-detail.component';
import { AplicacionPopupComponent } from './aplicacion-dialog.component';
import { AplicacionDeletePopupComponent } from './aplicacion-delete-dialog.component';

export const aplicacionRoute: Routes = [
    {
        path: 'aplicacion',
        component: AplicacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Aplicacions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'aplicacion/:id',
        component: AplicacionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Aplicacions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const aplicacionPopupRoute: Routes = [
    {
        path: 'aplicacion-new',
        component: AplicacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Aplicacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'aplicacion/:id/edit',
        component: AplicacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Aplicacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'aplicacion/:id/delete',
        component: AplicacionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Aplicacions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
