import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MarcaComponent } from './marca.component';
import { MarcaDetailComponent } from './marca-detail.component';
import { MarcaPopupComponent } from './marca-dialog.component';
import { MarcaDeletePopupComponent } from './marca-delete-dialog.component';

export const marcaRoute: Routes = [
    {
        path: 'marca',
        component: MarcaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Marcas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'marca/:id',
        component: MarcaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Marcas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const marcaPopupRoute: Routes = [
    {
        path: 'marca-new',
        component: MarcaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Marcas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'marca/:id/edit',
        component: MarcaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Marcas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'marca/:id/delete',
        component: MarcaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Marcas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
