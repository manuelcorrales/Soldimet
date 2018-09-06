import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DetallePresupuesto } from 'app/shared/model/detalle-presupuesto.model';
import { DetallePresupuestoService } from 'app/entities/detalle-presupuesto/detalle-presupuesto.service';
import { DetallePresupuestoComponent } from 'app/entities/detalle-presupuesto/detalle-presupuesto.component';
import { DetallePresupuestoDetailComponent } from 'app/entities/detalle-presupuesto/detalle-presupuesto-detail.component';
import { DetallePresupuestoUpdateComponent } from 'app/entities/detalle-presupuesto/detalle-presupuesto-update.component';
import { DetallePresupuestoDeletePopupComponent } from 'app/entities/detalle-presupuesto/detalle-presupuesto-delete-dialog.component';
import { IDetallePresupuesto } from 'app/shared/model/detalle-presupuesto.model';

@Injectable({ providedIn: 'root' })
export class DetallePresupuestoResolve implements Resolve<IDetallePresupuesto> {
    constructor(private service: DetallePresupuestoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((detallePresupuesto: HttpResponse<DetallePresupuesto>) => detallePresupuesto.body));
        }
        return of(new DetallePresupuesto());
    }
}

export const detallePresupuestoRoute: Routes = [
    {
        path: 'detalle-presupuesto',
        component: DetallePresupuestoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DetallePresupuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'detalle-presupuesto/:id/view',
        component: DetallePresupuestoDetailComponent,
        resolve: {
            detallePresupuesto: DetallePresupuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DetallePresupuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'detalle-presupuesto/new',
        component: DetallePresupuestoUpdateComponent,
        resolve: {
            detallePresupuesto: DetallePresupuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DetallePresupuestos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'detalle-presupuesto/:id/edit',
        component: DetallePresupuestoUpdateComponent,
        resolve: {
            detallePresupuesto: DetallePresupuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DetallePresupuestos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const detallePresupuestoPopupRoute: Routes = [
    {
        path: 'detalle-presupuesto/:id/delete',
        component: DetallePresupuestoDeletePopupComponent,
        resolve: {
            detallePresupuesto: DetallePresupuestoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DetallePresupuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
