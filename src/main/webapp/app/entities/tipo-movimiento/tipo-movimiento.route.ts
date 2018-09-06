import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipoMovimiento } from 'app/shared/model/tipo-movimiento.model';
import { TipoMovimientoService } from 'app/entities/tipo-movimiento/tipo-movimiento.service';
import { TipoMovimientoComponent } from 'app/entities/tipo-movimiento/tipo-movimiento.component';
import { TipoMovimientoDetailComponent } from 'app/entities/tipo-movimiento/tipo-movimiento-detail.component';
import { TipoMovimientoUpdateComponent } from 'app/entities/tipo-movimiento/tipo-movimiento-update.component';
import { TipoMovimientoDeletePopupComponent } from 'app/entities/tipo-movimiento/tipo-movimiento-delete-dialog.component';
import { ITipoMovimiento } from 'app/shared/model/tipo-movimiento.model';

@Injectable({ providedIn: 'root' })
export class TipoMovimientoResolve implements Resolve<ITipoMovimiento> {
    constructor(private service: TipoMovimientoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((tipoMovimiento: HttpResponse<TipoMovimiento>) => tipoMovimiento.body));
        }
        return of(new TipoMovimiento());
    }
}

export const tipoMovimientoRoute: Routes = [
    {
        path: 'tipo-movimiento',
        component: TipoMovimientoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoMovimientos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-movimiento/:id/view',
        component: TipoMovimientoDetailComponent,
        resolve: {
            tipoMovimiento: TipoMovimientoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoMovimientos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-movimiento/new',
        component: TipoMovimientoUpdateComponent,
        resolve: {
            tipoMovimiento: TipoMovimientoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoMovimientos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tipo-movimiento/:id/edit',
        component: TipoMovimientoUpdateComponent,
        resolve: {
            tipoMovimiento: TipoMovimientoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoMovimientos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoMovimientoPopupRoute: Routes = [
    {
        path: 'tipo-movimiento/:id/delete',
        component: TipoMovimientoDeletePopupComponent,
        resolve: {
            tipoMovimiento: TipoMovimientoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoMovimientos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
