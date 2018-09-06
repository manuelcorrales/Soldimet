import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Localidad } from 'app/shared/model/localidad.model';
import { LocalidadService } from 'app/entities/localidad/localidad.service';
import { LocalidadComponent } from 'app/entities/localidad/localidad.component';
import { LocalidadDetailComponent } from 'app/entities/localidad/localidad-detail.component';
import { LocalidadUpdateComponent } from 'app/entities/localidad/localidad-update.component';
import { LocalidadDeletePopupComponent } from 'app/entities/localidad/localidad-delete-dialog.component';
import { ILocalidad } from 'app/shared/model/localidad.model';

@Injectable({ providedIn: 'root' })
export class LocalidadResolve implements Resolve<ILocalidad> {
    constructor(private service: LocalidadService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((localidad: HttpResponse<Localidad>) => localidad.body));
        }
        return of(new Localidad());
    }
}

export const localidadRoute: Routes = [
    {
        path: 'localidad',
        component: LocalidadComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Localidads'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'localidad/:id/view',
        component: LocalidadDetailComponent,
        resolve: {
            localidad: LocalidadResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Localidads'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'localidad/new',
        component: LocalidadUpdateComponent,
        resolve: {
            localidad: LocalidadResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Localidads'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'localidad/:id/edit',
        component: LocalidadUpdateComponent,
        resolve: {
            localidad: LocalidadResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Localidads'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const localidadPopupRoute: Routes = [
    {
        path: 'localidad/:id/delete',
        component: LocalidadDeletePopupComponent,
        resolve: {
            localidad: LocalidadResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Localidads'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
