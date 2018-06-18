import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CobranzaRepuestoComponent } from './cobranza-repuesto.component';
import { CobranzaRepuestoDetailComponent } from './cobranza-repuesto-detail.component';
import { CobranzaRepuestoPopupComponent } from './cobranza-repuesto-dialog.component';
import { CobranzaRepuestoDeletePopupComponent } from './cobranza-repuesto-delete-dialog.component';

export const cobranzaRepuestoRoute: Routes = [
    {
        path: 'cobranza-repuesto',
        component: CobranzaRepuestoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobranzaRepuestos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cobranza-repuesto/:id',
        component: CobranzaRepuestoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobranzaRepuestos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cobranzaRepuestoPopupRoute: Routes = [
    {
        path: 'cobranza-repuesto-new',
        component: CobranzaRepuestoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobranzaRepuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cobranza-repuesto/:id/edit',
        component: CobranzaRepuestoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobranzaRepuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cobranza-repuesto/:id/delete',
        component: CobranzaRepuestoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CobranzaRepuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
