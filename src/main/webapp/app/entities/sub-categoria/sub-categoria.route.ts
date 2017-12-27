import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SubCategoriaComponent } from './sub-categoria.component';
import { SubCategoriaDetailComponent } from './sub-categoria-detail.component';
import { SubCategoriaPopupComponent } from './sub-categoria-dialog.component';
import { SubCategoriaDeletePopupComponent } from './sub-categoria-delete-dialog.component';

export const subCategoriaRoute: Routes = [
    {
        path: 'sub-categoria',
        component: SubCategoriaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubCategorias'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'sub-categoria/:id',
        component: SubCategoriaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubCategorias'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const subCategoriaPopupRoute: Routes = [
    {
        path: 'sub-categoria-new',
        component: SubCategoriaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubCategorias'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sub-categoria/:id/edit',
        component: SubCategoriaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubCategorias'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'sub-categoria/:id/delete',
        component: SubCategoriaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'SubCategorias'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
