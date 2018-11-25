import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sucursal } from 'app/shared/model/sucursal.model';
import { SucursalService } from './sucursal.service';
import { SucursalComponent } from './sucursal.component';
import { SucursalDetailComponent } from './sucursal-detail.component';
import { SucursalUpdateComponent } from './sucursal-update.component';
import { SucursalDeletePopupComponent } from './sucursal-delete-dialog.component';
import { ISucursal } from 'app/shared/model/sucursal.model';

@Injectable({ providedIn: 'root' })
export class SucursalResolve implements Resolve<ISucursal> {
    constructor(private service: SucursalService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((sucursal: HttpResponse<Sucursal>) => sucursal.body));
        }
        return of(new Sucursal());
    }
}

export const sucursalRoute: Routes = [
    {
        path: 'sucursal',
        component: SucursalComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sucursals'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sucursal/:id/view',
        component: SucursalDetailComponent,
        resolve: {
            sucursal: SucursalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sucursals'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sucursal/new',
        component: SucursalUpdateComponent,
        resolve: {
            sucursal: SucursalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sucursals'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'sucursal/:id/edit',
        component: SucursalUpdateComponent,
        resolve: {
            sucursal: SucursalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sucursals'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sucursalPopupRoute: Routes = [
    {
        path: 'sucursal/:id/delete',
        component: SucursalDeletePopupComponent,
        resolve: {
            sucursal: SucursalResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sucursals'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
