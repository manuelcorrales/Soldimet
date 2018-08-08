import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HistorialPrecio } from 'app/shared/model/historial-precio.model';
import { HistorialPrecioService } from './historial-precio.service';
import { HistorialPrecioComponent } from './historial-precio.component';
import { HistorialPrecioDetailComponent } from './historial-precio-detail.component';
import { HistorialPrecioUpdateComponent } from './historial-precio-update.component';
import { HistorialPrecioDeletePopupComponent } from './historial-precio-delete-dialog.component';
import { IHistorialPrecio } from 'app/shared/model/historial-precio.model';

@Injectable({ providedIn: 'root' })
export class HistorialPrecioResolve implements Resolve<IHistorialPrecio> {
    constructor(private service: HistorialPrecioService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((historialPrecio: HttpResponse<HistorialPrecio>) => historialPrecio.body));
        }
        return of(new HistorialPrecio());
    }
}

export const historialPrecioRoute: Routes = [
    {
        path: 'historial-precio',
        component: HistorialPrecioComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HistorialPrecios'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'historial-precio/:id/view',
        component: HistorialPrecioDetailComponent,
        resolve: {
            historialPrecio: HistorialPrecioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HistorialPrecios'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'historial-precio/new',
        component: HistorialPrecioUpdateComponent,
        resolve: {
            historialPrecio: HistorialPrecioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HistorialPrecios'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'historial-precio/:id/edit',
        component: HistorialPrecioUpdateComponent,
        resolve: {
            historialPrecio: HistorialPrecioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HistorialPrecios'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const historialPrecioPopupRoute: Routes = [
    {
        path: 'historial-precio/:id/delete',
        component: HistorialPrecioDeletePopupComponent,
        resolve: {
            historialPrecio: HistorialPrecioResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HistorialPrecios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
