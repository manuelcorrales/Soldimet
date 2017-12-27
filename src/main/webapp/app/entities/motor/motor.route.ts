import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MotorComponent } from './motor.component';
import { MotorDetailComponent } from './motor-detail.component';
import { MotorPopupComponent } from './motor-dialog.component';
import { MotorDeletePopupComponent } from './motor-delete-dialog.component';

export const motorRoute: Routes = [
    {
        path: 'motor',
        component: MotorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Motors'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'motor/:id',
        component: MotorDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Motors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const motorPopupRoute: Routes = [
    {
        path: 'motor-new',
        component: MotorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Motors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'motor/:id/edit',
        component: MotorPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Motors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'motor/:id/delete',
        component: MotorDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Motors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
