import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PersonaComponent } from './persona.component';
import { PersonaDetailComponent } from './persona-detail.component';
import { PersonaPopupComponent } from './persona-dialog.component';
import { PersonaDeletePopupComponent } from './persona-delete-dialog.component';

@Injectable()
export class PersonaResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const personaRoute: Routes = [
    {
        path: 'persona',
        component: PersonaComponent,
        resolve: {
            'pagingParams': PersonaResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Personas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'persona/:id',
        component: PersonaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Personas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const personaPopupRoute: Routes = [
    {
        path: 'persona-new',
        component: PersonaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Personas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'persona/:id/edit',
        component: PersonaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Personas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'persona/:id/delete',
        component: PersonaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Personas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
