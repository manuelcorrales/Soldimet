import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ListaPrecioRectificacionCRAMComponent } from './lista-precio-rectificacion-cram.component';
import { ListaPrecioRectificacionCRAMDetailComponent } from './lista-precio-rectificacion-cram-detail.component';
import { ListaPrecioRectificacionCRAMPopupComponent } from './lista-precio-rectificacion-cram-dialog.component';
import {
    ListaPrecioRectificacionCRAMDeletePopupComponent
} from './lista-precio-rectificacion-cram-delete-dialog.component';

export const listaPrecioRectificacionCRAMRoute: Routes = [
    {
        path: 'lista-precio-rectificacion-cram',
        component: ListaPrecioRectificacionCRAMComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ListaPrecioRectificacionCRAMS'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'lista-precio-rectificacion-cram/:id',
        component: ListaPrecioRectificacionCRAMDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ListaPrecioRectificacionCRAMS'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const listaPrecioRectificacionCRAMPopupRoute: Routes = [
    {
        path: 'lista-precio-rectificacion-cram-new',
        component: ListaPrecioRectificacionCRAMPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ListaPrecioRectificacionCRAMS'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lista-precio-rectificacion-cram/:id/edit',
        component: ListaPrecioRectificacionCRAMPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ListaPrecioRectificacionCRAMS'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lista-precio-rectificacion-cram/:id/delete',
        component: ListaPrecioRectificacionCRAMDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ListaPrecioRectificacionCRAMS'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
