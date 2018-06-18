import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CostoRepuestoComponent } from './costo-repuesto.component';
import { CostoRepuestoDetailComponent } from './costo-repuesto-detail.component';
import { CostoRepuestoPopupComponent } from './costo-repuesto-dialog.component';
import { CostoRepuestoDeletePopupComponent } from './costo-repuesto-delete-dialog.component';

export const costoRepuestoRoute: Routes = [
    {
        path: 'costo-repuesto',
        component: CostoRepuestoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostoRepuestos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'costo-repuesto/:id',
        component: CostoRepuestoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostoRepuestos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const costoRepuestoPopupRoute: Routes = [
    {
        path: 'costo-repuesto-new',
        component: CostoRepuestoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostoRepuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'costo-repuesto/:id/edit',
        component: CostoRepuestoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostoRepuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'costo-repuesto/:id/delete',
        component: CostoRepuestoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CostoRepuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
