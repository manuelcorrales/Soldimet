import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovimientoPresupuesto } from 'app/shared/model/movimiento-presupuesto.model';
import { MovimientoPresupuestoService } from 'app/entities/movimiento-presupuesto/movimiento-presupuesto.service';
import { MovimientoPresupuestoComponent } from 'app/entities/movimiento-presupuesto/movimiento-presupuesto.component';
import { MovimientoPresupuestoDetailComponent } from 'app/entities/movimiento-presupuesto/movimiento-presupuesto-detail.component';
import { MovimientoPresupuestoUpdateComponent } from 'app/entities/movimiento-presupuesto/movimiento-presupuesto-update.component';
import { MovimientoPresupuestoDeletePopupComponent } from 'app/entities/movimiento-presupuesto/movimiento-presupuesto-delete-dialog.component';
import { IMovimientoPresupuesto } from 'app/shared/model/movimiento-presupuesto.model';

@Injectable({ providedIn: 'root' })
export class MovimientoPresupuestoResolve implements Resolve<IMovimientoPresupuesto> {
    constructor(private service: MovimientoPresupuestoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((movimientoPresupuesto: HttpResponse<MovimientoPresupuesto>) => movimientoPresupuesto.body));
        }
        return of(new MovimientoPresupuesto());
    }
}

export const movimientoPresupuestoRoute: Routes = [
    {
        path: 'movimiento-presupuesto',
        component: MovimientoPresupuestoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovimientoPresupuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'movimiento-presupuesto/:id/view',
        component: MovimientoPresupuestoDetailComponent,
        resolve: {
            movimientoPresupuesto: MovimientoPresupuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovimientoPresupuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'movimiento-presupuesto/new',
        component: MovimientoPresupuestoUpdateComponent,
        resolve: {
            movimientoPresupuesto: MovimientoPresupuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovimientoPresupuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'movimiento-presupuesto/:id/edit',
        component: MovimientoPresupuestoUpdateComponent,
        resolve: {
            movimientoPresupuesto: MovimientoPresupuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovimientoPresupuestos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const movimientoPresupuestoPopupRoute: Routes = [
    {
        path: 'movimiento-presupuesto/:id/delete',
        component: MovimientoPresupuestoDeletePopupComponent,
        resolve: {
            movimientoPresupuesto: MovimientoPresupuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovimientoPresupuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
