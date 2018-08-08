import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Rubro } from 'app/shared/model/rubro.model';
import { RubroService } from './rubro.service';
import { RubroComponent } from './rubro.component';
import { RubroDetailComponent } from './rubro-detail.component';
import { RubroUpdateComponent } from './rubro-update.component';
import { RubroDeletePopupComponent } from './rubro-delete-dialog.component';
import { IRubro } from 'app/shared/model/rubro.model';

@Injectable({ providedIn: 'root' })
export class RubroResolve implements Resolve<IRubro> {
    constructor(private service: RubroService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((rubro: HttpResponse<Rubro>) => rubro.body));
        }
        return of(new Rubro());
    }
}

export const rubroRoute: Routes = [
    {
        path: 'rubro',
        component: RubroComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rubros'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rubro/:id/view',
        component: RubroDetailComponent,
        resolve: {
            rubro: RubroResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rubros'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rubro/new',
        component: RubroUpdateComponent,
        resolve: {
            rubro: RubroResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rubros'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rubro/:id/edit',
        component: RubroUpdateComponent,
        resolve: {
            rubro: RubroResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rubros'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rubroPopupRoute: Routes = [
    {
        path: 'rubro/:id/delete',
        component: RubroDeletePopupComponent,
        resolve: {
            rubro: RubroResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rubros'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
