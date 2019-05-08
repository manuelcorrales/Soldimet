import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movimiento } from 'app/shared/model/movimiento.model';
import { MovimientoService } from './movimiento.service';
import { MovimientoComponent } from './movimiento.component';
import { MovimientoDetailComponent } from './movimiento-detail.component';
import { MovimientoUpdateComponent } from './movimiento-update.component';
import { MovimientoDeletePopupComponent } from './movimiento-delete-dialog.component';
import { IMovimiento } from 'app/shared/model/movimiento.model';

@Injectable({ providedIn: 'root' })
export class MovimientoResolve implements Resolve<IMovimiento> {
    constructor(private service: MovimientoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((movimiento: HttpResponse<Movimiento>) => movimiento.body));
        }
        return of(new Movimiento());
    }
}

export const movimientoRoute: Routes = [
    {
        path: 'movimiento',
        component: MovimientoComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Movimientos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'movimiento/:id/view',
        component: MovimientoDetailComponent,
        resolve: {
            movimiento: MovimientoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Movimientos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'movimiento/new',
        component: MovimientoUpdateComponent,
        resolve: {
            movimiento: MovimientoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Movimientos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'movimiento/:id/edit',
        component: MovimientoUpdateComponent,
        resolve: {
            movimiento: MovimientoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Movimientos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const movimientoPopupRoute: Routes = [
    {
        path: 'movimiento/:id/delete',
        component: MovimientoDeletePopupComponent,
        resolve: {
            movimiento: MovimientoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Movimientos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
