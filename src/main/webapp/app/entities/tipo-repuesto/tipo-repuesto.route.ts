import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipoRepuestoComponent } from './tipo-repuesto.component';
import { TipoRepuestoDetailComponent } from './tipo-repuesto-detail.component';
import { TipoRepuestoPopupComponent } from './tipo-repuesto-dialog.component';
import { TipoRepuestoDeletePopupComponent } from './tipo-repuesto-delete-dialog.component';

export const tipoRepuestoRoute: Routes = [
    {
        path: 'tipo-repuesto',
        component: TipoRepuestoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoRepuestos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipo-repuesto/:id',
        component: TipoRepuestoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoRepuestos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoRepuestoPopupRoute: Routes = [
    {
        path: 'tipo-repuesto-new',
        component: TipoRepuestoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoRepuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-repuesto/:id/edit',
        component: TipoRepuestoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoRepuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-repuesto/:id/delete',
        component: TipoRepuestoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoRepuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
