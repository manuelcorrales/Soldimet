import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EstadoMovimiento } from 'app/shared/model/estado-movimiento.model';
import { EstadoMovimientoService } from 'app/entities/estado-movimiento/estado-movimiento.service';
import { EstadoMovimientoComponent } from 'app/entities/estado-movimiento/estado-movimiento.component';
import { EstadoMovimientoDetailComponent } from 'app/entities/estado-movimiento/estado-movimiento-detail.component';
import { EstadoMovimientoUpdateComponent } from 'app/entities/estado-movimiento/estado-movimiento-update.component';
import { EstadoMovimientoDeletePopupComponent } from 'app/entities/estado-movimiento/estado-movimiento-delete-dialog.component';
import { IEstadoMovimiento } from 'app/shared/model/estado-movimiento.model';

@Injectable({ providedIn: 'root' })
export class EstadoMovimientoResolve implements Resolve<IEstadoMovimiento> {
    constructor(private service: EstadoMovimientoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((estadoMovimiento: HttpResponse<EstadoMovimiento>) => estadoMovimiento.body));
        }
        return of(new EstadoMovimiento());
    }
}

export const estadoMovimientoRoute: Routes = [
    {
        path: 'estado-movimiento',
        component: EstadoMovimientoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoMovimientos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estado-movimiento/:id/view',
        component: EstadoMovimientoDetailComponent,
        resolve: {
            estadoMovimiento: EstadoMovimientoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoMovimientos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estado-movimiento/new',
        component: EstadoMovimientoUpdateComponent,
        resolve: {
            estadoMovimiento: EstadoMovimientoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoMovimientos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estado-movimiento/:id/edit',
        component: EstadoMovimientoUpdateComponent,
        resolve: {
            estadoMovimiento: EstadoMovimientoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoMovimientos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const estadoMovimientoPopupRoute: Routes = [
    {
        path: 'estado-movimiento/:id/delete',
        component: EstadoMovimientoDeletePopupComponent,
        resolve: {
            estadoMovimiento: EstadoMovimientoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoMovimientos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
