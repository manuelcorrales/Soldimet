import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Proveedor } from 'app/shared/model/proveedor.model';
import { ProveedorService } from './proveedor.service';
import { ProveedorComponent } from './proveedor.component';
import { ProveedorDetailComponent } from './proveedor-detail.component';
import { ProveedorUpdateComponent } from './proveedor-update.component';
import { ProveedorDeletePopupComponent } from './proveedor-delete-dialog.component';
import { IProveedor } from 'app/shared/model/proveedor.model';

@Injectable({ providedIn: 'root' })
export class ProveedorResolve implements Resolve<IProveedor> {
    constructor(private service: ProveedorService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((proveedor: HttpResponse<Proveedor>) => proveedor.body));
        }
        return of(new Proveedor());
    }
}

export const proveedorRoute: Routes = [
    {
        path: 'proveedor',
        component: ProveedorComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Proveedors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'proveedor/:id/view',
        component: ProveedorDetailComponent,
        resolve: {
            proveedor: ProveedorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Proveedors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'proveedor/new',
        component: ProveedorUpdateComponent,
        resolve: {
            proveedor: ProveedorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Proveedors'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'proveedor/:id/edit',
        component: ProveedorUpdateComponent,
        resolve: {
            proveedor: ProveedorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Proveedors'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const proveedorPopupRoute: Routes = [
    {
        path: 'proveedor/:id/delete',
        component: ProveedorDeletePopupComponent,
        resolve: {
            proveedor: ProveedorResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Proveedors'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
