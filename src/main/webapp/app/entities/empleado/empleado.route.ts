import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { EmpleadoComponent } from './empleado.component';
import { EmpleadoDetailComponent } from './empleado-detail.component';
import { EmpleadoPopupComponent } from './empleado-dialog.component';
import { EmpleadoDeletePopupComponent } from './empleado-delete-dialog.component';

export const empleadoRoute: Routes = [
    {
        path: 'empleado',
        component: EmpleadoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Empleados'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'empleado/:id',
        component: EmpleadoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Empleados'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const empleadoPopupRoute: Routes = [
    {
        path: 'empleado-new',
        component: EmpleadoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Empleados'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'empleado/:id/edit',
        component: EmpleadoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Empleados'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'empleado/:id/delete',
        component: EmpleadoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Empleados'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
