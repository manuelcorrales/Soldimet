import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipoParteMotorComponent } from './tipo-parte-motor.component';
import { TipoParteMotorDetailComponent } from './tipo-parte-motor-detail.component';
import { TipoParteMotorPopupComponent } from './tipo-parte-motor-dialog.component';
import { TipoParteMotorDeletePopupComponent } from './tipo-parte-motor-delete-dialog.component';

export const tipoParteMotorRoute: Routes = [
    {
        path: 'tipo-parte-motor',
        component: TipoParteMotorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoParteMotors'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipo-parte-motor/:id',
        component: TipoParteMotorDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoParteMotors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoParteMotorPopupRoute: Routes = [
    {
        path: 'tipo-parte-motor-new',
        component: TipoParteMotorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoParteMotors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-parte-motor/:id/edit',
        component: TipoParteMotorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoParteMotors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-parte-motor/:id/delete',
        component: TipoParteMotorDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoParteMotors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
