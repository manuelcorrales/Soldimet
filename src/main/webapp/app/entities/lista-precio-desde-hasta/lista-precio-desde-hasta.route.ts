import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ListaPrecioDesdeHastaComponent } from './lista-precio-desde-hasta.component';
import { ListaPrecioDesdeHastaDetailComponent } from './lista-precio-desde-hasta-detail.component';
import { ListaPrecioDesdeHastaPopupComponent } from './lista-precio-desde-hasta-dialog.component';
import { ListaPrecioDesdeHastaDeletePopupComponent } from './lista-precio-desde-hasta-delete-dialog.component';

export const listaPrecioDesdeHastaRoute: Routes = [
    {
        path: 'lista-precio-desde-hasta',
        component: ListaPrecioDesdeHastaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ListaPrecioDesdeHastas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'lista-precio-desde-hasta/:id',
        component: ListaPrecioDesdeHastaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ListaPrecioDesdeHastas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const listaPrecioDesdeHastaPopupRoute: Routes = [
    {
        path: 'lista-precio-desde-hasta-new',
        component: ListaPrecioDesdeHastaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ListaPrecioDesdeHastas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lista-precio-desde-hasta/:id/edit',
        component: ListaPrecioDesdeHastaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ListaPrecioDesdeHastas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lista-precio-desde-hasta/:id/delete',
        component: ListaPrecioDesdeHastaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ListaPrecioDesdeHastas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
