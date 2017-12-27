import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { EstadoPersonaComponent } from './estado-persona.component';
import { EstadoPersonaDetailComponent } from './estado-persona-detail.component';
import { EstadoPersonaPopupComponent } from './estado-persona-dialog.component';
import { EstadoPersonaDeletePopupComponent } from './estado-persona-delete-dialog.component';

export const estadoPersonaRoute: Routes = [
    {
        path: 'estado-persona',
        component: EstadoPersonaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPersonas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'estado-persona/:id',
        component: EstadoPersonaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPersonas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const estadoPersonaPopupRoute: Routes = [
    {
        path: 'estado-persona-new',
        component: EstadoPersonaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPersonas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estado-persona/:id/edit',
        component: EstadoPersonaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPersonas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estado-persona/:id/delete',
        component: EstadoPersonaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPersonas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
