import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DetalleMovimiento } from 'app/shared/model/detalle-movimiento.model';
import { DetalleMovimientoService } from './detalle-movimiento.service';
import { DetalleMovimientoComponent } from './detalle-movimiento.component';
import { DetalleMovimientoDetailComponent } from './detalle-movimiento-detail.component';
import { DetalleMovimientoUpdateComponent } from './detalle-movimiento-update.component';
import { DetalleMovimientoDeletePopupComponent } from './detalle-movimiento-delete-dialog.component';
import { IDetalleMovimiento } from 'app/shared/model/detalle-movimiento.model';

@Injectable({ providedIn: 'root' })
export class DetalleMovimientoResolve implements Resolve<IDetalleMovimiento> {
    constructor(private service: DetalleMovimientoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((detalleMovimiento: HttpResponse<DetalleMovimiento>) => detalleMovimiento.body));
        }
        return of(new DetalleMovimiento());
    }
}

export const detalleMovimientoRoute: Routes = [
    {
        path: 'detalle-movimiento',
        component: DetalleMovimientoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DetalleMovimientos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'detalle-movimiento/:id/view',
        component: DetalleMovimientoDetailComponent,
        resolve: {
            detalleMovimiento: DetalleMovimientoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DetalleMovimientos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'detalle-movimiento/new',
        component: DetalleMovimientoUpdateComponent,
        resolve: {
            detalleMovimiento: DetalleMovimientoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DetalleMovimientos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'detalle-movimiento/:id/edit',
        component: DetalleMovimientoUpdateComponent,
        resolve: {
            detalleMovimiento: DetalleMovimientoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DetalleMovimientos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const detalleMovimientoPopupRoute: Routes = [
    {
        path: 'detalle-movimiento/:id/delete',
        component: DetalleMovimientoDeletePopupComponent,
        resolve: {
            detalleMovimiento: DetalleMovimientoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DetalleMovimientos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
