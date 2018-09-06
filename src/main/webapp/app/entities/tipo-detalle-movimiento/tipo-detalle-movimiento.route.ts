import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipoDetalleMovimiento } from 'app/shared/model/tipo-detalle-movimiento.model';
import { TipoDetalleMovimientoService } from 'app/entities/tipo-detalle-movimiento/tipo-detalle-movimiento.service';
import { TipoDetalleMovimientoComponent } from 'app/entities/tipo-detalle-movimiento/tipo-detalle-movimiento.component';
import { TipoDetalleMovimientoDetailComponent } from 'app/entities/tipo-detalle-movimiento/tipo-detalle-movimiento-detail.component';
import { TipoDetalleMovimientoUpdateComponent } from 'app/entities/tipo-detalle-movimiento/tipo-detalle-movimiento-update.component';
import { TipoDetalleMovimientoDeletePopupComponent } from 'app/entities/tipo-detalle-movimiento/tipo-detalle-movimiento-delete-dialog.component';
import { ITipoDetalleMovimiento } from 'app/shared/model/tipo-detalle-movimiento.model';

@Injectable({ providedIn: 'root' })
export class TipoDetalleMovimientoResolve implements Resolve<ITipoDetalleMovimiento> {
    constructor(private service: TipoDetalleMovimientoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((tipoDetalleMovimiento: HttpResponse<TipoDetalleMovimiento>) => tipoDetalleMovimiento.body));
        }
        return of(new TipoDetalleMovimiento());
    }
}

export const tipoDetalleMovimientoRoute: Routes = [
    {
        path: 'tipo-detalle-movimiento',
        component: TipoDetalleMovimientoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoDetalleMovimientos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-detalle-movimiento/:id/view',
        component: TipoDetalleMovimientoDetailComponent,
        resolve: {
            tipoDetalleMovimiento: TipoDetalleMovimientoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoDetalleMovimientos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-detalle-movimiento/new',
        component: TipoDetalleMovimientoUpdateComponent,
        resolve: {
            tipoDetalleMovimiento: TipoDetalleMovimientoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoDetalleMovimientos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-detalle-movimiento/:id/edit',
        component: TipoDetalleMovimientoUpdateComponent,
        resolve: {
            tipoDetalleMovimiento: TipoDetalleMovimientoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoDetalleMovimientos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoDetalleMovimientoPopupRoute: Routes = [
    {
        path: 'tipo-detalle-movimiento/:id/delete',
        component: TipoDetalleMovimientoDeletePopupComponent,
        resolve: {
            tipoDetalleMovimiento: TipoDetalleMovimientoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoDetalleMovimientos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
