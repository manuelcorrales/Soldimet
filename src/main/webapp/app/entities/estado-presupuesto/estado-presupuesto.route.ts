import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EstadoPresupuesto } from 'app/shared/model/estado-presupuesto.model';
import { EstadoPresupuestoService } from './estado-presupuesto.service';
import { EstadoPresupuestoComponent } from './estado-presupuesto.component';
import { EstadoPresupuestoDetailComponent } from './estado-presupuesto-detail.component';
import { EstadoPresupuestoUpdateComponent } from './estado-presupuesto-update.component';
import { EstadoPresupuestoDeletePopupComponent } from './estado-presupuesto-delete-dialog.component';
import { IEstadoPresupuesto } from 'app/shared/model/estado-presupuesto.model';

@Injectable({ providedIn: 'root' })
export class EstadoPresupuestoResolve implements Resolve<IEstadoPresupuesto> {
    constructor(private service: EstadoPresupuestoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((estadoPresupuesto: HttpResponse<EstadoPresupuesto>) => estadoPresupuesto.body));
        }
        return of(new EstadoPresupuesto());
    }
}

export const estadoPresupuestoRoute: Routes = [
    {
        path: 'estado-presupuesto',
        component: EstadoPresupuestoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPresupuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estado-presupuesto/:id/view',
        component: EstadoPresupuestoDetailComponent,
        resolve: {
            estadoPresupuesto: EstadoPresupuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPresupuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estado-presupuesto/new',
        component: EstadoPresupuestoUpdateComponent,
        resolve: {
            estadoPresupuesto: EstadoPresupuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPresupuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'estado-presupuesto/:id/edit',
        component: EstadoPresupuestoUpdateComponent,
        resolve: {
            estadoPresupuesto: EstadoPresupuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPresupuestos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const estadoPresupuestoPopupRoute: Routes = [
    {
        path: 'estado-presupuesto/:id/delete',
        component: EstadoPresupuestoDeletePopupComponent,
        resolve: {
            estadoPresupuesto: EstadoPresupuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPresupuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
